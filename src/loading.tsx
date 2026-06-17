const PageLoading: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-ring {
          width: 48px;
          height: 48px;
          border: 2px solid #f0f0f0;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        .loading-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .loading-dot {
          width: 8px;
          height: 8px;
          background-color: #000;
          border-radius: 50%;
          animation: dot-pulse 1.2s infinite ease-in-out;
        }
        .loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .loading-dot:nth-child(2) { animation-delay: -0.16s; }
      `}</style>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div className="loading-ring" />
        <span
          style={{
            fontSize: 12,
            color: '#999',
            fontWeight: 500,
          }}
        >
          加载中
        </span>
      </div>
    </div>
  );
};

export default PageLoading;
