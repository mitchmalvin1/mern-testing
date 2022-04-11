import './App.css';
import { useState, useEffect } from "react"
import Axios from 'axios'

function App() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [listFriend, setList] = useState([]);

    const addFriend = () => {
        Axios.post('https://mern-testt.herokuapp.com/addFriend', { name: name, age: age }).then((response) => {
            //if we successfully inserted
            setList([...listFriend, {_id: response.data._id ,name: name, age: age }])
        }).catch(() => {
            alert('aww, it didnt work');
        })
    }

    const updateFriend = (id) => {
        console.log(id);
        const newAge = prompt("Enter new age: ");

        Axios.put("https://mern-testt.herokuapp.com/update", {
            newAge: newAge,
            id: id
        }).then( () => {
            setList(listFriend.map( (value) => {
                  return value._id ===id? {_id:id,name:value.name,age:newAge} : value;
            }))
        })
    }

    const deleteFriend =  (id) => {
        console.log(id);
         Axios.delete(`https://mern-testt.herokuapp.com/delete/${id}`).then ( () => {
             setList( listFriend.filter( (val) => {
                 return val._id !== id;
             }) )
         })
     
    }


    useEffect(() => {
        Axios.get('https://mern-testt.herokuapp.com/read').then((response) => {
            setList(response.data);

        }).catch(() => {
            console.log("error");
        })
    }, []);

    return (
        <div className="App" >
            <div className="inputs">
                <input onChange={(event) => {
                    setName(event.target.value);
                }} type="text" placeholder="Friend name..." />
                <input onChange={(event) => {
                    setAge(event.target.value);
                }}
                    type="number" placeholder="Friend age..." />
                <button onClick={addFriend}>
                    Add Friend
                </button>

            </div>
            <div className="friendList">
                {listFriend.map((friend) => {
                    return (
                        <div className="friendContainer">
                            <div className="friend">
                                <h3>Name:{friend.name} </h3>
                                <h3> Age:{friend.age}</h3>
                            </div>
                            <button onClick={() => {
                                updateFriend(friend._id);
                            }}>Update</button>

                            <button onClick={ () => {
                                deleteFriend(friend._id);
                            }}
                            id="removeBtn">X</button>

                        </div>)



                })}
            </div>


        </div>
    );
}

export default App;