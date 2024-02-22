function Test() {
  const yoImg =
    "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/104576/images/60c0daf-336a-171-86b-3a2b5d63df6a_1673353327682.png";

  return (
    <>
      <div className="About">
        <p>
          With the new advancement from Ultralytics YOLOv8 (You only look once)
          . Ultralytics latest YOLO-World Model is a revolutionary
          Open-Vocabulary Detection tasks, This model allows user to input any
          classes they may have.
          <br />
          <br />
          This web-application is your central hub for developing and deploying
          model through a user friendly interface.
        </p>
        <img src={yoImg} alt={"Just testing"} loading="lazy" />
      </div>
    </>
  );
}

export default Test;
