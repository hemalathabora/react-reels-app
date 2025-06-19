import { useEffect, useRef, useState } from "react";
import videos from "./data/videos";
import VideoCard from "./components/VideoCard";
import BottomNav from "./components/BottomNav";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext"; // ✅ Import useAuth

function App() {
  const { isLoggedIn } = useAuth(); // ✅ Use context instead of local state
  const [visibleVideos, setVisibleVideos] = useState(20);
  const loaderRef = useRef(null);

  // Infinite scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setVisibleVideos((prev) =>
            Math.min(prev + 2, videos.length)
          );
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.25,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, []);

  // Block app if user not logged in
  if (!isLoggedIn) return <Login />;

  return (
    <>
      {/* Fullscreen scrollable video feed */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar bg-black">
        <div className="mx-auto max-w-screen-sm">
          {videos.slice(0, visibleVideos).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {visibleVideos < videos.length && (
          <div ref={loaderRef} className="h-10 w-full bg-transparent" />
        )}
      </div>

      {/* Persistent bottom navigation bar */}
      <BottomNav />
    </>
  );
}

export default App;
