import { useRef, useState, useEffect } from "react";

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    parseInt(video.likes.replace(/[^\d]/g, ""))
  );
  const [showShare, setShowShare] = useState(false);

 useEffect(() => {
  const observer = new IntersectionObserver(
    async ([entry]) => {
      const video = videoRef.current;
      if (!video) return;

      try {
        if (entry.isIntersecting) {
          await video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      } catch (err) {
        console.warn("Video autoplay error:", err);
      }
    },
    { threshold: 0.7 }
  );

  if (videoRef.current) observer.observe(videoRef.current);
  return () => videoRef.current && observer.unobserve(videoRef.current);
}, []);


  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  const handleLike = () => {
    if (liked) return;
    const prevLikes = likeCount;
    setLikeCount(prevLikes + 1);
    setLiked(true);

    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (!success) {
        setLikeCount(prevLikes);
        setLiked(false);
        alert("API failed! Like reverted.");
      }
    }, 1000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.videoUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="snap-start h-screen w-full relative overflow-hidden">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="h-full w-full object-cover"
        muted={isMuted}
        loop
        onClick={togglePlay}
        onDoubleClick={handleLike}
      />

      {/* Left Overlay */}
      <div className="absolute bottom-24 left-4 right-28 text-white z-10 max-w-[70%] md:max-w-[50%] lg:max-w-[40%]">

        <p className="font-semibold text-sm">{video.hashtag}</p>
        <div className="flex items-center gap-2 mt-1 mb-2">
          <img
            src={video.userImage}
            alt="user"
            className="w-8 h-8 rounded-full border border-white"
          />
          <span className="font-semibold">{video.userName}</span>
          <button
  onClick={() => setIsFollowing(!isFollowing)}
  className={`text-xs px-2 py-1 rounded transition-all duration-300 ${
    isFollowing ? "bg-green-500 text-white" : "bg-white text-black"
  }`}
>
  {isFollowing ? "Following" : "Follow"}
</button>

        </div>
        <p className="text-lg font-bold">
          {video.title}{" "}
          <span className="text-sm text-gray-400">{video.episode}</span>
        </p>
        <p className="line-clamp-3 text-sm">{video.description}</p>
        {video.isPaid && (
          <span className="text-xs mt-2 inline-block bg-yellow-400 text-black px-2 py-1 rounded">
            Paid
          </span>
        )}
      </div>

      {/* Right Overlay */}
      <div className="absolute bottom-24 right-4 flex flex-col items-center gap-4 z-10">
  <img
          src={video.userImage}
          className="w-10 h-10 rounded-full border"
          alt="user"
        />

        <p onClick={toggleLike} className="cursor-pointer">
          <i
  className={`fas fa-heart text-xl transition-all duration-300 ${
    liked ? "text-red-500 scale-110" : "text-white"
  }`}
/>

          <br />
          <span className="text-xs">{likeCount}</span>
        </p>

        <p>
          <i className="fas fa-comment"></i>
          <br />
          <span className="text-xs">{video.comments}</span>
        </p>
        <p>
          <i className="fas fa-share"></i>
          <br />
          <span className="text-xs">{video.shares}</span>
        </p>
        <p>
          <i className="fas fa-coins"></i>
          <br />
          <span className="text-xs">{video.earnings}</span>
        </p>

        <p onClick={() => setShowShare(!showShare)} className="cursor-pointer">
          <i className="fas fa-ellipsis-v"></i>
        </p>

        {/* Share Popup */}
        {showShare && (
          <div className="absolute bottom-24 right-14 bg-black bg-opacity-90 text-white p-3 rounded-lg shadow-md text-sm w-36 z-50">
            <p
              className="hover:text-green-400 cursor-pointer"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(video.videoUrl)}`,
                  "_blank"
                )
              }
            >
              <i className="fab fa-whatsapp mr-2"></i> WhatsApp
            </p>
            <p className="hover:text-pink-400 cursor-not-allowed opacity-60">
              <i className="fab fa-instagram mr-2"></i> Instagram
            </p>
            <p
              onClick={handleCopyLink}
              className="hover:text-blue-400 cursor-pointer"
            >
              <i className="fas fa-link mr-2"></i> Copy Link
            </p>
          </div>
        )}
      </div>

      {/* Mute Toggle */}
      <div
        onClick={toggleMute}
        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded cursor-pointer text-xs"
      >
        {isMuted ? "Muted" : "Unmuted"}
      </div>
    </div>
  );
}

export default VideoCard;
