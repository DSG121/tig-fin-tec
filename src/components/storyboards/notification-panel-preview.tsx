import NotificationPanel from "../notification-panel";

export default function NotificationPanelPreview() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">Notification Panel</h2>
      <div className="flex items-center justify-center p-4 border rounded-lg">
        <NotificationPanel />
        <span className="ml-4 text-sm text-gray-500">
          ← Click the bell icon to open notifications
        </span>
      </div>
    </div>
  );
}
