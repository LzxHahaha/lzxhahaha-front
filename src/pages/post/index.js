/**
 * Created by LzxHahaha on 2016/5/31.
 */

import * as React from 'react';
import { Route } from "react-router-dom";

import List from './List';
import Detail from './Detail';
import New from './New';
import Edit from './Edit';

export default [
    <Route path="/post" exact component={List} />,
    <Route path="/post/detail/:id" component={Detail}/>,
    <Route path="/post/new" component={New}/>,
    <Route path="/post/edit/:id" component={Edit}/>,
];
