import { useState } from 'react';
import { motion } from 'framer-motion';

function SuspenseList({ items, onClose, history }) {
  // 🔍 Determine urgency category
  function getDueStatus(dueDateStr) {
    const todayStr = new Date().toISOString().slice(0, 10);
    const dueStr = new Date(dueDateStr).toISOString().slice(0, 10);

    if (dueStr < todayStr) return 'Past Due';
    if (dueStr === todayStr) return 'Due Today';

    const diffDays = (new Date(dueStr) - new Date(todayStr)) / (1000 * 60 * 60 * 24);
    if (diffDays <= 3 && diffDays > 0) return 'Due Soon';

    return 'Upcoming';
  }

  // 🧩 Group items by urgency
  const grouped = {
    'Past Due': [],
    'Due Today': [],
    'Due Soon': [],
    'Upcoming': []
  };

  items.forEach(item => {
    const status = getDueStatus(item.dueDate);
    grouped[status].push(item);
  });

  // 🎯 Badge classes
  const getBadgeClass = status =>
    status === 'Past Due' ? 'badge-danger-strong' :
    status === 'Due Today' ? 'badge-warning-strong' :
    status === 'Due Soon' ? 'badge-soon' :
    'badge-secondary';

  // 🔽 Collapse toggles
  const [collapsed, setCollapsed] = useState({
    'Past Due': false,
    'Due Today': false,
    'Due Soon': false,
    'Upcoming': true
  });

  const toggleCollapse = tier =>
    setCollapsed(prev => ({ ...prev, [tier]: !prev[tier] }));

  // 🎛️ Filter toggles
  const [activeFilters, setActiveFilters] = useState(Object.keys(grouped));
  const toggleFilter = tier => {
    setActiveFilters(prev =>
      prev.includes(tier)
        ? prev.filter(t => t !== tier)
        : [...prev, tier]
    );
  };

  // 📊 Summary display
  const summary = Object.entries(grouped).map(([tier, list]) => {
    const emoji =
      tier === 'Past Due' ? '🔴' :
      tier === 'Due Today' ? '🟡' :
      tier === 'Due Soon' ? '🔵' :
      '🟢';
    return `${emoji} ${list.length} ${tier}`;
  });

  return (
    <div className="card shadow-sm">
      <div className="card-header fw-bold">Suspense Items</div>
      <div className="card-body">
        {/* 📊 Summary counts */}
        <div className="mb-3 fw-bold text-muted">
          {summary.join(' | ')}
        </div>

        {/* 🎛️ Filter controls */}
        <div className="mb-3 d-flex flex-wrap gap-2">
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => setActiveFilters(Object.keys(grouped))}
          >
            Show All
          </button>
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => setActiveFilters([])}
          >
            Clear All
          </button>
          {Object.keys(grouped).map(tier => (
            <button
              key={tier}
              className={`btn btn-sm ${
                activeFilters.includes(tier)
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => toggleFilter(tier)}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* 🔽 Grouped sections */}
        {Object.entries(grouped).map(([tier, groupItems]) =>
          activeFilters.includes(tier) && (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <div
                className="d-flex justify-content-between align-items-center mb-2"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleCollapse(tier)}
              >
                <h5 className="fw-bold mb-0">{tier}</h5>
                <span className="badge bg-secondary rounded-pill">
                  {groupItems.length}
                </span>
                <span>{collapsed[tier] ? '+' : '-'}</span>
              </div>

              {!collapsed[tier] && (
                groupItems.length === 0 ? (
                  <div className="text-muted fst-italic px-3 py-2">
                    You’re all caught up — nothing {tier.toLowerCase()} 😄
                  </div>
                ) : (
                  <ul className="list-group list-group-flush">
                    {groupItems.map(item => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div>
                          <h6 className="mb-1">{item.title}</h6>
                          <small>
                            {item.customer} — Due: {item.dueDate}
                            <span className={`badge ms-2 ${getBadgeClass(tier)}`}>
                              {tier}
                            </span>
                          </small>
                          <p className="mb-0">{item.notes}</p>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => onClose(item.id)}
                        >
                          Close
                        </button>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </motion.div>
          )
        )}

        {/* 📓 Suspense History */}
        <div className="mt-4">
          <h5 className="fw-bold">📓 Suspense History</h5>
          {history.length === 0 ? (
            <p className="text-muted fst-italic">No items closed yet.</p>
          ) : (
            <ul className="list-group">
              {history.map(item => (
                <li key={item.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{item.title} — {item.customer}</span>
                    <small className="text-muted">
                      Closed at {new Date(item.closedAt).toLocaleString()}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuspenseList;
