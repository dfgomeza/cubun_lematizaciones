const ReadingProgress = ({ progress, folio }) => {
  const showHead = progress > 0;

  return (
    <div className="reading-progress-wrapper container-fluid px-0">
      <div className="reading-progress-track">
        <div id="progress_reading" style={{ width: `${progress}%` }}>
          {showHead && <div className="progress_reading_head" />}
        </div>
      </div>
      <div id="folio_info">
        {folio}
      </div>
    </div>
  );
};

export default ReadingProgress;
