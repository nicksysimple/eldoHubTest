import React from 'react';
import './App.css';
import styled from 'styled-components';
import { NavigationBar } from './NavigationBar'
import { SideNav } from './sidebar'
const StyledSideNav = styled.div`   
    position: fixed;   
    height: 100%;
   
    z-index: 1;      /* Stay on top of everything */
    top: 3.7em;      /* Stay at the top */
    background-color: #fff; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
    border: solid 1px lightgrey;
`;

class App extends React.Component {
	 constructor(props) {
        super(props);
         this.btnTapped = this
            .btnTapped
            .bind(this);
        this.state = {
            items: [
                {
                 
                  name: 'Fetching Data from Chucknorris .....',
                  
                },
                  
              ],
              items2:"Loading ......", items3:"Tap An Item to view contents",it:"animal"


        }

    }
      btnTapped(e) {


      	this.setState({
        items3: "Displaying in a few ..."
      });
      	 this.loaddata(e);
       
        
    }
    render() {
        const { items, activePath } = this.state;
        return(
        	  <React.Fragment>

            
        	  <NavigationBar />
            <StyledSideNav className="col-2">
                {
                    items.map((item) => {
                       
                        	return (
                  <div className="col-12">
                <a  className={this.props.css} onClick={e => this.btnTapped(item.name)}>
               { item.name }
                 
                </a>
                  <hr/>
               
            </div>)
                        
                    })
                }
            </StyledSideNav>
   <div className="container" >
   <div className="row">
<div className="col-sm-2 col-lg-2 col-md-2 ">

</div>
   
 
<div className="col-sm-8 col-lg-8 col-md-8 shadow p-3 mb-5 bg-white rounded" onClick={this.btnTapped}>
  <div dangerouslySetInnerHTML={{__html:this.state.items3}}></div>
  </div>
  
   </div>
   </div>
      
           </React.Fragment>
        );
    }
    onItemClick = () => {
        alert("hello");
    }
    loaddata(e){

     fetch("https://api.chucknorris.io/jokes/random?category="+e, {
      "method": "GET"
    })
    .then(response => response.json())
    .then(response => {
    	
    	var st="<div>";
    	st=st+"<label>category:     "+response['categories']+"</label>"
    	st=st+"<br/>"
    	st=st+"<label>Joke Created At:     "+response['created_at']+"</label>"
    	st=st+"<br/>"
    	st=st+"<label>Joke Updated  At:     "+response['updated_at']+"</label>"
    	
    	st=st+"<br/>"
    	st=st+"<image src='"+response['icon_url']+ "'/>";
    	st=st+"<br/>"
    	st=st+"<label style={ color:'red' }>Joke Of the Day:     "+response['value']+"</label>"
    	st=st+"</div>"

      this.setState({
        items3: st
      })
    })
    .catch(err => { console.log(err); 
    });
    }
 
  componentDidMount() {
   
    fetch("https://api.chucknorris.io/jokes/categories", {
      "method": "GET"
    })
    .then(response => response.json())
    .then(response => {
    	
    	var st=[];
    	for (var i = response.length - 1; i >= 0; i--) {
    		var j={"name":response[i]};
    		st.push(j);
    	}
    	

      this.setState({
        items: st
      })
    })
    .catch(err => { console.log(err); 
    });
    this.loaddata("animal");

  }
  showme(){
  	alert("hello");
  }

 

}


class NavItem extends React.Component  {
   constructor(props) {
      super(props);
      
    }

    handleClick = () => {
      alert("hello");
     var p2=new App();
    p2.btnTapped();

 
     
    }


    render() {
        const { active } = this.props;
        return(
            <div className="col-12">
                <a  className={this.props.css} onClick={this.handleClick}>
               { this.props.name}
                   
                </a>
            </div>
        );
    }
}




export default App;
