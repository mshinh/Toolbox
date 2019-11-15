import React, { Component,  useState, useEffect } from "react";
import Post from "./Post";
import "./style.scss";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts, getUserPosts } from "../../actions/post";



const PostDisplay = ({  
    getPosts,
    
    post: {posts, loading}

    }) => {

    const [currpost, updateCurr] = useState({
        title: "",
        body: "",
        name: "",
      
    });
    const [active, updateActive] = useState(false)


    const activeContent = post => {
      updateCurr({title: post.title, body: post.body, name: post.name});
      updateActiveState(true)
    
    };
    const updateActiveState = newSet => {
      updateActive(newSet)
    }


    useEffect(() => {
        getPosts();
    }, [getPosts]);
  

  return loading ? "" : (
    <div className="home-container">
    
      
  
      <div className="page-heading">
        <h1>Welcome To Toolbox</h1>
        <h2>
          Your one stop location for <br />
          skilled workers and opportunities{" "}
        </h2>
      </div>
      {/* Make this a class */}
      <div className="post-template">
        <div className="post-popup">
          {/* This has to be moved becasue it will take up the entire home page */}
        </div>
        <div className="post-board">
            {/* {this.createPosts()} */}
            {posts.map(post => (
                    <div key={post._id}  className="post">
                    <h4>{post.name}</h4>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <div className="buttom-container">
                      <button
                        type="submit"
                        onClick={e => {
                          activeContent(post);
                        }}
                        className="input-btn"
                      >
                        <h4>More Information</h4>
                        <span className="button-bar"></span>
                      </button>
                    </div>
                  </div>
            ))}
        </div>
      </div>
      
      <Post currPost={currpost} active={active} toggle={updateActiveState} />

    </div>
  )
};

PostDisplay.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getPosts, getUserPosts })(
    withRouter(PostDisplay)
);
  


// class PostDisplay extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currPost: { id: 0, type: "", title: "", desc: "" }
//     };
//     this.createPosts = this.createPosts.bind(this);
//     this.currentSettings = this.currentSetting.bind(this);
//     this.activeContent = this.activeContent.bind(this);
//   }

//   currentSetting = () => {
//     let currPath = this.props.location.pathname;
//     return currPath.substr(1);
//   };
//   createPosts = () => {
//     let post = {
//       id: 0,
//       type: "Job Posting",
//       title: "Home Page Testing",
//       desc:
//         " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. "
//     };
//     let Accountpost = {
//       id: 0,
//       type: "Job Posting",
//       title: "Account Page Posting",
//       desc:
//         " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. "
//     };
//     let posts = [];
//     let postData = [];
//     console.log(this.currentSetting());

//     if (this.currentSetting() === "account") {
//       //On Account Page
//       postData.push(Accountpost);
//     } else {
//       //On Home Page
//       postData.push(post);
//     }

//     //Add a check to see if the user has posted anything

//     if (postData.length > 0) {
//       postData.map((data, index) => {
//         posts.push(this.postContent(data, index));
//       });
//     }

//     return posts;
//   };

//   postContent = (data, idx) => {
//     let post = (
    //   <div key={idx} className="post">
    //     <h4>{data.type}</h4>
    //     <h3>{data.title}</h3>
    //     <p>{data.desc}</p>
    //     <div className="buttom-container">
    //       <button
    //         type="submit"
    //         onClick={e => {
    //           this.activeContent(data);
    //         }}
    //         className="input-btn"
    //       >
    //         <h4>More Information</h4>
    //         <span className="button-bar"></span>
    //       </button>
    //     </div>
    //   </div>
//     );

//     return post;
//   };

//   activeContent = data => {
//     console.log("update Content");
//     this.setState({
//       currPost: data
//     });
//   };

//   render() {
//     return (
//       <div className="home-container">
//         <Post currPost={this.state.currPost} />

//         <div className="page-heading">
//           <h1>Welcome To Toolbox</h1>
//           <h2>
//             Your one stop location for <br />
//             skilled workers and opportunities{" "}
//           </h2>
//         </div>
//         {/* Make this a class */}
//         <div className="post-template">
//           <div className="post-popup">
//             {/* This has to be moved becasue it will take up the entire home page */}
//           </div>
//           <div className="post-board">{this.createPosts()}</div>
//         </div>
//       </div>
//     );
//   }
// }

// export default PostDisplay;
