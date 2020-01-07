// import React from 'react';
import Loadable from 'react-loadable';
export default function withLoadable( comp ){
    return Loadable({
        loader : comp,
        loading : ()=>null,
        delay : 0
    });
}