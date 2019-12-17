import React from 'react';
// import './App.css';
import './game.scss'
class Game extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			itemList : [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
			score:0,
		};
		this.itemListArr = [];
	}
	componentDidMount(){
		this.getRandomItem(this.state.itemList.slice(0));
	    document.addEventListener("keydown",this.onKeyDown.bind(this));
	}
	onKeyDown(e){
		// console.log("onKeyDown:",e,this)
		let keyCode = e.keyCode;
		// console.log("方向：",['左','上','右','下'][keyCode-37]);
		if(keyCode === 38){//上
			// let itemList = this.handleKeyTop(this.state.itemList.slice(0));
			let itemList = this.handleKeyEvent(this.state.itemList.slice(0),[0,1,2,3],true);
			this.getRandomItem(itemList);
		}else if(keyCode === 40){//下
			// let itemList = this.handleKeyBottom(this.state.itemList.slice(0));
			let itemList = this.handleKeyEvent(this.state.itemList.slice(0),[3,2,1,0],true);
			this.getRandomItem(itemList);
		}else if(keyCode === 37){//左
			let itemList = this.handleKeyEvent(this.state.itemList.slice(0),[0,1,2,3],false);
			// let itemList = this.handleKeyLeft(this.state.itemList.slice(0));
			this.getRandomItem(itemList);
		}else if(keyCode === 39){//右
			let itemList = this.handleKeyEvent(this.state.itemList.slice(0),[3,2,1,0],false);
			// let itemList = this.handleKeyRight(this.state.itemList.slice(0));
			this.getRandomItem(itemList);
		}
	}
	handleKeyEvent(itemList,indexArr,reverseFlag){//处理键盘事件
		let score = 0;
		for(let k1 = 0;k1<indexArr.length;k1++){
			let k2Arr = indexArr.slice(0,indexArr.length-1);
			for(let k2 = 0;k2 < k2Arr.length;k2++){
				let k3Arr = indexArr.slice(k2+1);
				for(let k3 of k3Arr){
					let value1 = reverseFlag?itemList[k2Arr[k2]][indexArr[k1]]:itemList[indexArr[k1]][k2Arr[k2]];
					let value2 = reverseFlag?itemList[k3][indexArr[k1]]:itemList[indexArr[k1]][k3];
					if(value1 === value2){
						if(value1!==0){
							score += value1+value2;
							reverseFlag?itemList[k2Arr[k2]][indexArr[k1]]=value1+value2:itemList[indexArr[k1]][k2Arr[k2]]=value1+value2;
							reverseFlag?itemList[k3][indexArr[k1]]=0:itemList[indexArr[k1]][k3]=0;
							k2++;
							break;
						}
					}else if(value2!==0){
						break;
					}
				}
			}
		}
		for(let k1 = 0;k1<indexArr.length;k1++){
			let k2Arr = indexArr.slice(0,indexArr.length-1);
			for(let k2 = 0;k2 < k2Arr.length;k2++){
				let value1 = reverseFlag?itemList[k2Arr[k2]][indexArr[k1]]:itemList[indexArr[k1]][k2Arr[k2]];
				if(value1!==0){
					continue;
				}
				let k3Arr = indexArr.slice(k2+1);
				for(let k3 of k3Arr){
					let value2 = reverseFlag?itemList[k3][indexArr[k1]]:itemList[indexArr[k1]][k3];
					if(value2 !== 0){
						reverseFlag?itemList[k2Arr[k2]][indexArr[k1]]=value2:itemList[indexArr[k1]][k2Arr[k2]]=value2;
						reverseFlag?itemList[k3][indexArr[k1]]=0:itemList[indexArr[k1]][k3]=0;
						break;
					}
				}
			}
		}
		if(score){
			this.setState({
				score:this.state.score+score
			});
		}
		return itemList;
	}
	handleKeyLeft(itemList){//处理键盘左事件，已废弃
		//相同的相加
		let score = 0;
		for(let k1 = 0;k1 < 4;k1++){
			for(let k2 = 0;k2 < 3;k2++){
				for(let k3 = k2+1;k3 < 4;k3++){
					if(itemList[k1][k2] === itemList[k1][k3]){
						if(itemList[k1][k2]!==0){
							itemList[k1][k2]+=itemList[k1][k3];
							score += itemList[k1][k2];
							itemList[k1][k3] = 0;
							k2++;
							break;
						}
					}else if(itemList[k1][k3]!==0){
						break;
					}
				}
			}
		} 
		//位移
		for(let k1 = 0;k1 < 4;k1++){
			for(let k2 = 0;k2 < 3;k2++){
				if(itemList[k1][k2]!==0){
					continue;
				}
				for(let k3 = k2+1;k3 < 4;k3++){
					if(itemList[k1][k3] !== 0){
						itemList[k1][k2]=itemList[k1][k3];
						itemList[k1][k3] = 0;
						break;
					}
				}
			}
		}
		if(score){
			this.setState({
				score:this.state.score+score
			});
		}
		return itemList;
	}
	handleKeyTop(itemList){//处理键盘上事件，已废弃
		let score = 0;
		for(let k1 = 0;k1 < 4;k1++){
			for(let k2 = 0;k2 < 3;k2++){
				for(let k3 = k2+1;k3 < 4;k3++){
					if(itemList[k2][k1] === itemList[k3][k1]){
						if(itemList[k2][k1]!==0){
							itemList[k2][k1]+=itemList[k3][k1];
							score += itemList[k2][k1];
							itemList[k3][k1] = 0;
							k2++;
							break;
						}
					}else if(itemList[k3][k1] !== 0){
						break;
					}
				}
			}
		}
		//位移
		for(let k1 = 0;k1 < 4;k1++){
			for(let k2 = 0;k2 < 3;k2++){
				if(itemList[k2][k1]!==0){
					continue;
				}
				for(let k3 = k2+1;k3 < 4;k3++){
					if(itemList[k3][k1] !== 0){
						itemList[k2][k1]=itemList[k3][k1];
						itemList[k3][k1] = 0;
						break;
					}
				}
			}
		}
		if(score){
			this.setState({
				score:this.state.score+score
			});
		}
		return itemList;
	}
	handleKeyRight(itemList){//处理键盘右事件，已废弃
		let score = 0;
		//相同的相加
		for(let k1 = 3;k1 >= 0;k1--){
			for(let k2 = 3;k2 > 0;k2--){
				for(let k3 = k2-1;k3 >= 0;k3--){
					if(itemList[k1][k2] === itemList[k1][k3]){
						if(itemList[k1][k2]!==0){
							itemList[k1][k2]+=itemList[k1][k3];
							itemList[k1][k3] = 0;
							score += itemList[k1][k2];
							k2--;
							break;
						}
					}else if(itemList[k1][k3]){
						break;
					}
				}
			}
		}
		//位移
		for(let k1 = 3;k1 >= 0;k1--){
			for(let k2 = 3;k2 > 0;k2--){
				if(itemList[k1][k2]!==0){
					continue;
				}
				for(let k3 = k2-1;k3 >= 0;k3--){
					if(itemList[k1][k3] !== 0){
						itemList[k1][k2]=itemList[k1][k3];
						itemList[k1][k3] = 0;
						break;
					}
				}
			}
		}
		if(score){
			this.setState({
				score:this.state.score+score
			});
		}
		return itemList;
	}
	handleKeyBottom(itemList){//处理键盘下事件，已废弃
		let score = 0;
		for(let k1 = 3;k1 >= 0;k1--){
			for(let k2 = 3;k2 > 0;k2--){
				for(let k3 = k2-1;k3 >= 0;k3--){
					if(itemList[k2][k1] === itemList[k3][k1]){
						if(itemList[k2][k1]!==0){
							itemList[k2][k1]+=itemList[k3][k1];
							itemList[k3][k1] = 0;
							score += itemList[k3][k1];
							k2--;
							break;
						}
					}else if(itemList[k3][k1]){
						break;
					}
				}
			}
		}
		//位移
		for(let k1 = 3;k1 >= 0;k1--){
			for(let k2 = 3;k2 > 0;k2--){
				if(itemList[k2][k1]!==0){
					continue;
				}
				for(let k3 = k2-1;k3 >= 0;k3--){
					if(itemList[k3][k1] !== 0){
						itemList[k2][k1]=itemList[k3][k1];
						itemList[k3][k1] = 0;
						break;
					}
				}
			}
		}
		if(score){
			this.setState({
				score:this.state.score+score
			});
		}
		return itemList;
	}
	getRandomItem(itemList){//随机在空白处显示随机数字
		let emptyArr = [];
		for(let k1 in itemList){
			for(let k2 in itemList[k1]){
				if(itemList[k1][k2] === 0){
					emptyArr.push(k1+'#'+k2);
				}
			}
		}
		if(!emptyArr.length){
			return;
		}
		let randomIndex = emptyArr[parseInt(Math.random()*emptyArr.length)];
		let randowNum = [2,4][parseInt(Math.random()*2)];
		randomIndex = randomIndex.split('#');
		itemList[randomIndex[0]][randomIndex[1]] = randowNum;

		this.setState({
			itemList : itemList
		});
		console.log("itemList:",JSON.parse(JSON.stringify(itemList)));
	}
	showHistory(){//查看历史
		// console.log("history:",this.itemListArr);
	}
	reStart(){//重新开始
		this.setState({
			itemList : [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
			score:0,
		},()=>{
			this.getRandomItem([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
		});
		
	}
	renderGameItem(){//渲染棋盘
		let itemList = this.state.itemList;
		let gameItemArr = [];
		for(var k1 in itemList){
			for(var k2 in itemList[k1]){
				let value = itemList[k1][k2];
				let item;
				if(value){
					item = (
						<div key={(k1+','+k2)} className="game-item">
							<span className={'num_'+value} >{value}</span>
						</div>
					)
				}else{
					item = (<div key={(k1+','+k2)} className="game-item"></div>);
				}
				gameItemArr.push(item);
			}
			
		}
		return gameItemArr;
	}
	render(){
		return(
			<div>
				<div className="game-wrapper">
					{
						this.renderGameItem()
					}
			    </div>
			    <div className="game-operate">
					<span className="game-score">总分：{this.state.score}</span>
					<button onClick={()=>this.reStart()} className="game-restart">重新开始</button>
			    </div>
		    </div>
    	)
	}
}

export default Game;
