import './styles.scss';

const ImageLayout = (props) => {
  return (
    <>
      <div className="image-layout-container">
        <img className="image-layout-image" src={props.backgroundImage} alt="background image" />

        {props.children}
      </div>
    </>
  );
};

export default ImageLayout;
