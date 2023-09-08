import PropTypes from "prop-types";

const Headers = (props) => {
  const { children } = props;
  return (
    <section className="h-80 flex flex-row border border-purple-700">
      {children}
    </section>
  );
};

Headers.propTypes = {
  children: PropTypes.node,
};

export default Headers;