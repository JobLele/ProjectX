// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
 
// export const UserContext=React.createContext({}); 

// class UserProvider extends Component{
//     static propTypes={
//         children:PropTypes.node.isRequired,
//     }

//     state={
//         isLoggedIn:false,
//     }
//     render(){
//         const{ isLoggedIn }=this.state;
//         const {children}=this.props;
//         return(
//             <UserContext.Provider value={{
//                 isLoggedIn,
//             }}
//             >
//                 {children}
//             </UserContext.Provider>
//         );
//     }
// }
// export default UserProvider