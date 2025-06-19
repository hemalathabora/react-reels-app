import { useAuth } from "../context/AuthContext";
function BottomNav() {
 const { logout } = useAuth();
  return (
    <div className="fixed bottom-0 w-full bg-black text-white flex justify-around items-center py-3 border-t border-gray-700 z-50 md:py-4 md:text-base">
      <div className="text-xs text-center">
        <i className="fas fa-home text-lg"></i>
        
      </div>
      <div className="text-xs text-center">
        <i className="fas fa-clapperboard text-lg"></i>
        
      </div>
      <div className="text-xs text-center">
        <i className="fas fa-plus-circle text-lg"></i>
        
      </div>
      <div className="text-xs text-center">
        <i className="fas fa-search text-lg"></i>
        
      </div>
      <div className="text-xs text-center cursor-pointer" onClick={logout}  >
        <i className="fas fa-user text-lg"></i>
        
      </div>
    </div>
  );
}

export default BottomNav;
