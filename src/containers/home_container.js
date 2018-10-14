import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';

import BookItem from '../widgetsUI/book_item';

class HomeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(getBooks(3, 0, 'desc'));
  }

  renderItems = books =>
    books.list
      ? books.list.map(item => <BookItem {...item} key={item._id} />)
      : null;

  loadmore = () => {
    let count = this.props.books.list.length;
    console.log(count);
    this.props.dispatch(getBooks(5, count, 'desc', this.props.books.list));
  };

  render() {
    return (
      <div>
        {this.renderItems(this.props.books)}
        <div className="loadmore" onClick={this.loadmore}>
          Load More
        </div>
        <div>
          <p>
            This Page is to review my favorite books and to get started just
            login using the side navigation. Once logged in you will see the
            user profile annd there will be more options in the side navigation
            bar. Take a look and have fun.
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps)(HomeContainer);
