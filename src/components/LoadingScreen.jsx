export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="h-10 w-10 border-4 border-aqua border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
