export default function Wallpaper({ isDarkMode }: { isDarkMode: boolean }) {
  const wallpaper = isDarkMode ? "/wallpaper-night.jpg" : "/wallpaper-day.jpg";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Wallpaper image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${wallpaper}')`,
        }}
      />

      {/* Subtle gradient overlay for better readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 100%)'
            : 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.1) 100%)',
        }}
      />
    </div>
  )
}
