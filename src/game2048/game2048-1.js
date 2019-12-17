import React from 'react';
import './game2048-1.css'

let left = fold_order(['a','b','c','d'],['1','2','3','4'],false),
    right = fold_order(['a','b','c','d'],['4','3','2','1'],false),
    up = fold_order(['1','2','3','4'],['a','b','c','d'],true),
    down = fold_order(['1','2','3','4'],['d','c','b','a'],true);
let initial_board = {
    a1:null,a2:null,a3:null,a4:null,
    b1:null,b2:null,b3:null,b4:null,
    c1:null,c2:null,c3:null,c4:null,
    d1:null,d2:null,d3:null,d4:null
};
let tile_counter = 0;
function fold_order(xs,ys,reverse_keys){
    return xs.map(x=>{
        return ys.map(y=>{
            var key = [x,y];
            if(reverse_keys){
                return key.reverse().join("");
            }
            return key.join("");
        });
    });
}
function fold_board(board,lines){
    var new_board = board;
    lines.forEach(line=>{
        var new_line = fold_line(board,line);
        Object.keys(new_line).forEach(key=>{
            new_board = set_tile(new_board,key,new_line[key]);
        });
    });
    return new_board;
}
function same_board(board1,board2){
    return Object.keys(board1).reduce((ret,key)=>{
        return ret && board1[key] ==  board2[key];
    },true);
}
function score_board(board){
    return used_spaces(board).map(key=>{
        return (board[key].values.reduce((a,b)=>{
            return a+b;
        })) - board[key].values[0];
    }).reduce((a,b)=>{
        return a+b;
    },0);
}

function fold_line(board,line){
    let tiles = line.map(key=>{
        return board[key];
    }).filter(tile=>{
        return tile !== null;
    });
    let new_tiles = [];
    if(tiles){
        //must loop so we can skip next if matched
        for(let i = 0;i < tiles.length;i++){
            let tile = tiles[i];
            if(tile){
                let val = tile_value(tile),
                    next_tile = tiles[i+1];
                if(next_tile && val == tile_value(next_tile)){
                    //skip next tile;
                    i++;
                    new_tiles.push({
                        id: next_tile.id, //keep id
                        values: tile.values.concat([val * 2])
                    });
                }else{
                    new_tiles.push(tile);
                }
            }
        }
    }
    let new_line = {};
    line.forEach((key,i)=>{
        new_line[key] = new_tiles[i] || null;
    });
    return new_line;
}

function new_tile(initial){
    return{
        id:tile_counter++,
        values:[initial]
    }
}
function set_tile(board,where,tile){
    //do not destroy the old board
    let new_board = {};
    Object.keys(board).forEach((key,i)=>{
        //copy by reference for structual sharing
        new_board[key] = (key == where)?tile:board[key];
    });
    return new_board;
}
function tile_value(tile){
    return tile?tile.values[tile.values.length-1]:null;
}
function can_move(board){
    var new_board = [up,down,left,right].reduce((b,direction)=>{
        return fold_board(b,direction);
    },board);
    return available_spaces(new_board).length>0;
}

function available_spaces(board){
    return Object.keys(board).filter(key=>{
        return board[key] == null;
    });
}
function used_spaces(board){
    return Object.keys(board).filter(key=>{
        return board[key] !== null;
    });
}

class GameBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        window.addEventListener('keydown',this.keyHandler,false);
    }
    getInitialState(){
        return this.addTile(this.adTile(initial_board));
    }
    keyHandler(e){
        var directions = {
            37:left,
            38:up,
            39:right,
            40:down
        };
        if(directions[e.keyCode] 
            && this.setBoard(fold_board(this.state,directions[e.keyCode])) 
            && Math.floor(Math.random()*30,0)<0){
            setTimeout(()=>{
                this.setBoard(this.addTile(this.state))
            },100);
        }
    }
    setBoard(new_board){
        if(!same_board(this.state,new_board)){
            this.setState(new_board);
            return true;
        }
        return false;
    }
    addTile(board){
        var location = available_spaces(board).sort(()=>{
            return .5 - Math.random();
        }).pop();
        if(location){
            var two_or_four = Math.floor(Math.random()*2,0)?2:4;
            return set_tile(board,location,new_tile(two_or_four));
        }
        return board;
    }
    newGame(){
        this.setState(this.getInitialState());
    }
    render(){
        var status = !can_move(this.state)?" - Game Over!":"";
        return(
            <div className="app">
                <span className="score">
                    Score:{score_board(this.state)}{status}
                </span>
                <Tiles board={this.state}/>
                <button onClick={()=>this.newGame}>New Game</button>
            </div>
        )
    }
}
class Tiles extends React.Component{
    render(){
        var board = this.props.board;
        var tiles = used_spaces(board).sort((a,b)=>{
            return board[1].id - board[b].id;
        });
        return(
            <div className="board">
                {
                    tiles.map(key=>{
                        var tile = board[key];
                        var val = tile_value(tile);
                        return(
                            <span key={tile.id} className={key+' value'+val}>{val}</span>
                        )
                    })
                }
            </div>
        )
    }
}
export default GameBoard;