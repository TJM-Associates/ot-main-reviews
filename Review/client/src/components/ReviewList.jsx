import React from 'react';
import PropTypes from 'prop-types';
import ReviewEntry from './ReviewEntry.jsx';
import ButtonList from './ButtonList.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    const { listOfReviews } = this.props;
    this.state = {
      currentListOfReviews: listOfReviews,
      pageIndex: 0,
    };
    this.changePage = this.changePage.bind(this);
  }


  componentDidUpdate(prevProps) {
    const { listOfReviews } = this.props;
    if (listOfReviews.length !== prevProps.listOfReviews.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        currentListOfReviews: listOfReviews,
      });
    }
  }

  changePage(indexClicked) {
    window.scrollTo({
      top: 380,
      behavior: 'auto',
    });

    this.setState({
      pageIndex: indexClicked,
    });
  }


  render() {
    // Batch the reviews into batches of 40 and push into reviewBatchArray
    const { currentListOfReviews } = this.state;
    const reviewBatchArray = [];
    if (currentListOfReviews.length > 40) {
      let tempCounter = 0;
      for (let i = 40; i < currentListOfReviews.length; i += 40) {
        reviewBatchArray.push(currentListOfReviews.slice(tempCounter, i));
        if (i + 40 > currentListOfReviews.length) {
          const amountleft = currentListOfReviews.length - i;
          const finalAmount = amountleft + i;
          reviewBatchArray.push(currentListOfReviews.slice(i, finalAmount));
        } else {
          tempCounter += 40;
        }
      }
    } else {
      reviewBatchArray.push(currentListOfReviews);
    }

    const { pageIndex } = this.state;
    // console.log(reviewBatchArray);
    return (

      <div key={`${pageIndex}Reviews`}>
        {reviewBatchArray.length !== 0
        // Add a key for each review to get rid of the error in the console logs
          ? reviewBatchArray[pageIndex].map((eachReview, index) => <ReviewEntry key={index} eachReview={eachReview} />)
          : null}
        {currentListOfReviews.length !== 0
          ? <ButtonList currentIndex={pageIndex} changePage={this.changePage} numberOfPages={reviewBatchArray.length} /> : null}
      </div>
    );
  }
}

ReviewList.propTypes = {
  listOfReviews: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number])).isRequired,
  // PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
};

export default ReviewList;
