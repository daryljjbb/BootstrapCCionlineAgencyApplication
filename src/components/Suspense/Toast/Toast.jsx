function Toast({ message, onClose }) {
  return (
    <div className="toast show position-fixed bottom-0 end-0 m-3 bg-success text-white">
      <div className="toast-body d-flex justify-content-between align-items-center">
        {message}
        <button className="btn-close btn-close-white" onClick={onClose}></button>
      </div>
    </div>
  );
}
export default Toast;