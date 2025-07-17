function SuspenseTabs({ activeTab, onSelect }) {
  return (
    <div className="btn-group mb-3">
      <button
        className={`btn btn-sm ${activeTab === 'open' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => onSelect('open')}
      >
        Open
      </button>
      <button
        className={`btn btn-sm ${activeTab === 'closed' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => onSelect('closed')}
      >
        Closed
      </button>
    </div>
  );
}
export default SuspenseTabs;