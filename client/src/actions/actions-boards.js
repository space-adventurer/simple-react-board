import constants from '../constants';
import axios from 'axios';

import { ROOT_URL } from '../constants';

export const apiFetchLists = () => (dispatch) => {
    axios.get(`${ROOT_URL}/api/list`)
        .then((res) => {
            dispatch({
                type: constants.API_FETCH_LISTS,
                payload: res.data
            });
        });
};

export const apiAddList = (listData) => (dispatch) => {
    axios.post(`${ROOT_URL}/api/list`, listData)
        .then((list) => {
            dispatch({
                type: constants.API_ADD_LIST,
                payload: list
            });
        });
};

export const apiDeleteList = (listId) => (dispatch) => {
    axios.delete(`${ROOT_URL}/api/list/${listId}`)
        .then((response) => {
            dispatch({
                type: constants.API_DELETE_LIST,
                payload: response
            });
        });
};

export const apiUpdateList = (data) => (dispatch) => {
    axios.post(`${ROOT_URL}/api/list/${data._id}`, data)
        .then((list) => {
            dispatch({
                type: constants.API_UPDATE_LIST,
                payload: list
            });
        });
};

export const updateListsOnDrop = ({ source, target }) => (dispatch) => {
    console.log('ACTION updateListsOnDrop', source, target);
    let updateSource = axios.post(`${ROOT_URL}/api/list/${source._id}`, { position: target.position });
    let updateTarget = axios.post(`${ROOT_URL}/api/list/${target._id}`, { position: source.position });
    Promise.all([updateSource, updateTarget])
        .then((response) => {
            dispatch({
                type: constants.UPDATE_LISTS_ON_DROP,
                payload: { sourceNewPosition: response[0].data, targetNewPosition: response[1].data }
            });
        });
};

// Old...
export function updateCardListsOnDrop({ source, target }) {
    return {
        type: constants.UPDATE_CARD_LISTS_ON_DROP,
        payload: { source, target }
    }
}

export function addCard(values) {
    return {
        type: constants.ADD_CARD,
        payload: values
    }
}

export function fetchCard(data) {
    return {
        type: constants.FETCH_CARD,
        payload: data
    }
}

export function updateCard(data) {
    return {
        type: constants.UPDATE_CARD,
        payload: data
    }
}

export function updateCardListsOnCardDrop(data) {
    return {
        type: constants.UPDATE_CARD_LISTS_ON_CARD_DROP,
        payload: data
    }
}
