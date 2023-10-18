import PropTypes from 'prop-types';
import styles from './navigation-link.module.css';

function NavigationLink(props) {
  return (
    <a href="#/" className={styles.link}>
      {props.icon}
      {props.children}
      <p className={props.textStyle}>{props.text}</p>     
    </a>
  );
}
NavigationLink.propTypes = {
  text: PropTypes.string.isRequired
};

export default NavigationLink;