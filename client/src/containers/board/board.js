import _ from 'lodash';
import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';

// Styles.
import './board.css';

// Actions.
import { apiFetchLists, updateListsOnDrop, updateListsOnCardDrop } from '../../actions/actions-boards';

// Components.
import CardList from '../../components/cardList/card-list';
import AddCardListForm from '../../components/addCardListForm/add-card-list-form';

// Wrap Board component as DragDropContext.
@DragDropContext(HTML5Backend)
class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddListFormShown: false
        };

        this.handleDropCardList = this.handleDropCardList.bind(this);
        this.handleDropCardToList = this.handleDropCardToList.bind(this);
        this.handleOnAddNewListClicked = this.handleOnAddNewListClicked.bind(this);
        this.handleAddListFormClose = this.handleAddListFormClose.bind(this);
    }

    // Fetch when component mounted.
    componentDidMount() {
        this.props.apiFetchLists();
    }

    // Call Update CardList Action Creator.
    handleDropCardList({ source, target }) {
        this.props.updateListsOnDrop({ source, target });
    }

    handleDropCardToList({ source, target }) {
        this.props.updateListsOnCardDrop({ source, target });
    }

    // Show and hide AddCardListForm form.
    handleOnAddNewListClicked() {
        this.setState({ isAddListFormShown: !this.state.isAddListFormShown });
    }

    // Show and hide AddCardListForm form.
    handleAddListFormClose() {
        this.setState({ isAddListFormShown: false });
    }

    renderAddListForm() {
        const isAddListFormShown = this.state.isAddListFormShown;

        if (isAddListFormShown) {
            return(
                <AddCardListForm onCanсelClicked={this.handleAddListFormClose} />
            );
        }
    }

    renderAddButton() {
        return (
            <button className="btn btn-default"
                    onClick={this.handleOnAddNewListClicked}>Add List</button>
        );
    }

    renderLists() {
        let { cardLists } = this.props;
        const sortedCardList = _.sortBy(cardLists, (cardList) => {
            return cardList.position;
        });

        return(
            _.map(sortedCardList, cardList => {
                return <CardList key={cardList._id}
                                 cardList={cardList}
                                 onDrop={this.handleDropCardList}
                                 onCardDrop={this.handleDropCardToList}/>
            })
        );
    }

    render() {
        return(
            <div className="view">
                <div className="view-container__header">
                    {this.renderAddButton()}
                </div>
                <div className="board-container">
                    <div className="board">
                        {this.renderAddListForm()}
                        {this.renderLists()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { cardLists: state.cardLists };
}

export default connect(mapStateToProps, { apiFetchLists, updateListsOnDrop, updateListsOnCardDrop })(Board);
