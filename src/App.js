import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs, triggerImport, fetchSummary } from './store/logSlice';
function App() {
  const dispatch = useDispatch();
  const { data: logs, status, summary } = useSelector(state => state.logs);

  useEffect(() => {
    dispatch(fetchLogs());
    dispatch(fetchSummary());
  }, [dispatch]);

    const handleImport = () => {
    dispatch(triggerImport());
  };
  return (
<div className="p-6 bg-gray-50 min-h-screen">
  <h1 className="text-3xl font-bold mb-6">📘 Job Import Tracker</h1>

    <button
      type="button"
      onClick={handleImport}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Import Jobs
    </button>
  <h2 className="text-xl font-semibold mb-4">🧾 Import Run Summary</h2>
<table className="w-full text-sm border-collapse border mb-10">
  <thead>
    <tr className="bg-blue-100">
      <th className="border border-gray-400 px-2 py-1">Run Time</th>
      <th className="border border-gray-400 px-2 py-1">Total</th>
      <th className="border border-gray-400 px-2 py-1">New</th>
      <th className="border border-gray-400 px-2 py-1">Updated</th>
      <th className="border border-gray-400 px-2 py-1">Failed</th>
    </tr>
  </thead>
  <tbody>
    {summary.map((item, index) => (
      <tr key={index} className="even:bg-gray-50 odd:bg-white">
        <td className="border border-gray-300 px-2 py-1">{item._id}</td>
        <td className="border border-gray-300 px-2 py-1">{item.totalFetched}</td>
        <td className="border border-gray-300 px-2 py-1">{item.newJobs}</td>
        <td className="border border-gray-300 px-2 py-1">{item.updatedJobs}</td>
        <td className="border border-gray-300 px-2 py-1">{item.failedJobs}</td>
      </tr>
    ))}
  </tbody>
</table>

  <h2 className="text-xl font-semibold mb-4">📄 Detailed Job Logs</h2>
  {status === 'loading' ? (
    <p>Loading logs...</p>
  ) : (
    <table className="w-full text-sm border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">Timestamp</th>
          <th className="border px-2 py-1">Source</th>
          <th className="border px-2 py-1">Status</th>
          <th className="border px-2 py-1">Job ID</th>
          <th className="border px-2 py-1">Reason</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td className="border px-2 py-1">{new Date(log.timestamp).toLocaleString()}</td>
            <td className="border px-2 py-1">{log.sourceURL}</td>
            <td className="border px-2 py-1">{log.status}</td>
            <td className="border px-2 py-1">{log.jobId}</td>
            <td className="border px-2 py-1">{log.reason || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
  );
}

export default App;
