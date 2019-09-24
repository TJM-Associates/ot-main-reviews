import React from 'react';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import ReviewList from './components/ReviewList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfReviews: [],
    };
  }

  componentDidMount() {
    const pathname = document.location.pathname.split('/');
    const urlParam = pathname[2];
    const host = 'ec2-52-8-6-53.us-west-1.compute.amazonaws.com';
    // eslint-disable-next-line no-console
    console.log(urlParam);
    // urlParam = urlParam.substring(0, urlParam.length - 1);
    // console.log(urlParam);
    window.urlParam = urlParam;
    axios.get(`http://${host}:3001/api/restaurants/${urlParam}/reviews`)
      .then((response) => {
        // console.log(response.data);
        const listOfReviews = response.data;
        // listOfReviews.sort((a, b) => new Date(b.date_dined) - new Date(a.date_dined));
        this.setState({
          listOfReviews,
        });
      });
  }

  render() {
    const { listOfReviews } = this.state;
    return (
      <div>
        <div><ReviewList listOfReviews={listOfReviews} /></div>
      </div>
    );
  }
}
window.Review = App;
export default App;
