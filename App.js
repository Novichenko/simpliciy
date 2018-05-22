import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';


 
  /*render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }*/


 var ClientsData = require('C:/Users/User/my-app/src/clients.json');
 class App extends Component {
    constructor(props){
        super(props);
       this.activeContact = {
           jobCompany: '',
           name: '',
           jobTitle: ''
       }
    }
    setActiveContact(item){
       this.setState(function(state,props){
          return {
              activeContact: item.name,
              activeContact: item.jobCompany,
              activeContact: item.jobTitle
          };
      });
      console.log('click');
    }
     render() {
    return <Contact setActiveContact = {this.setActiveContact} />
  }
}
 
class Contact extends Component{
   
    render() {
       
                        return (<li className='contact' onClick={() => this.props.setActiveContact}> 
                                    <img className='contact_avatar' src={this.props.avatar} width='60px' height='60px' alt='avatar'/>
                                    <div className='contact_name'>{this.props.name}</div>
                                    <div className='contact_job'>{this.props.jobTitle}</div>
                                    
                                </li>);
                      
                    }
                
};
class Noresults extends React.Component{
    render() {
        return <div className='no_results'>No results.</div>;
    }
};

class ClientsList extends React.Component {
       constructor(props){
           super(props);
            this.state ={
                 searchedContacts: ClientsData
            }; 
            this.instantSearch = this.instantSearch.bind(this);
        }
    instantSearch (event){
            var searchQuery = event.target.value.toLowerCase();
            var searchedContacts = ClientsData.filter(function(el){
                var searchFirstName = el.general.firstName.toLowerCase();
                var searchLastName  = el.general.lastName.toLowerCase();
                var searchCompany   = el.job.company.toLowerCase();
                var searchTitle     = el.job.title.toLowerCase();
                var searchPhone     = el.contact.phone.toLowerCase();
                var searchEmail     = el.contact.email.toLowerCase();
                var searchStreet    = el.address.street.toLowerCase();
                var searchCity      = el.address.city.toLowerCase();
                var searchZipCode   = el.address.zipCode.toLowerCase();
                var searchCountry   = el.address.country.toLowerCase();
                return ( 
                       (searchFirstName.indexOf(searchQuery) !== -1)  || 
                       (searchLastName.indexOf(searchQuery) !== -1)   ||
                       (searchCompany.indexOf(searchQuery) !== -1)    ||
                       (searchTitle.indexOf(searchQuery) !== -1)      ||
                       (searchPhone.indexOf(searchQuery) !== -1)      ||
                       (searchEmail.indexOf(searchQuery) !== -1)      ||
                       (searchStreet.indexOf(searchQuery) !== -1)     ||
                       (searchCity.indexOf(searchQuery) !== -1)       ||
                       (searchZipCode.indexOf(searchQuery) !== -1)    ||
                       (searchCountry.indexOf(searchQuery) !== -1)  
                       );
           });
           
           this.setState(function(state,props){
               return {
                   searchedContacts: searchedContacts
               }
           });
    }
            
    render() { 
        if (this.state.searchedContacts.length === 0){
            return (
                       <div className='contacts'>
                         <input type='text' placeholder='Search for...' className='search-field' onChange={this.instantSearch}/> 
                        <Noresults/>       
                       </div>
                    );
        }
        else {
        
            return(
                    <div className='contacts'>
                        <input type='text' placeholder='Search for...' className='search-field' onChange={this.instantSearch}/> 
                        <ul className='contacts_list'>
                            {
                                this.state.searchedContacts.map 
                                    (function(el,i) {
                                             return (<Contact 
                                                        key ={i}
                                                        name={el.general.firstName +' ' + el.general.lastName} 
                                                        avatar={el.general.avatar} 
                                                        jobTitle={el.job.title}
                                                     />);
                                    })
                            }      
                        </ul>
                    </div>         
            );
    }
    }
}

class ContactFullInfo extends React.Component {
     
    render() {
        return (<div className='info' id='info'>
                
                   <img className='' src={this.props.photo}  alt='Photo'/>
                   <div className=''>{this.props.fullname}</div>
                   <div className=''>Job</div>
                   <div className=''>{this.props.jobTitle + 
                                      this.props.jobCompany}
                   </div>
                   <div className=''>Contacts</div>
                   <div className=''>{this.props.contactEmail + 
                                      this.props.contactPhone}
                   </div>
                   <div className=''>Address</div>
                   <div className=''>{this.props.addressStreet + 
                                     this.props.addressCity    +
                                     this.props.addressZipCode + 
                                     this.props.addressCountry}
                   </div>
                   
                
               </div>);
    }
};
/*??????????????????????*/
class FullInfo extends Component{
    render(){
           
           return (
                   <div>
                    { 
                       this.props.activeContact
                        (function(item){
                            return(                        
                            <ContactFullInfo
                            photo={item.general.avatar}
                            fullname={item.general.firstName + ' ' + item.general.lastName}
                            jobTitle={item.job.title}
                            jobCompany={item.job.company}
                            contactEmail={item.contact.email}
                            contactPhone={item.contact.phone}
                            addressStreet={item.address.street}
                            addressCity={item.address.city}
                            addressZipCode={item.address.zipCode}
                            addressCountry={item.address.country}
                            />)
                        })
                    }    
                    </div>
            );
   }        
       
        
        
        
        
};

/*class FullInfo extends React.Component{
  
    render() {
            return (
                <ContactFullInfo
                photo={el.general.avatar}
                fullname={el.general.firstName + ' ' + el.general.lastName}
                jobTitle={el.job.title}
                jobCompany={el.job.company}
                contactEmail={el.contact.email}
                contactPhone={el.contact.phone}
                addressStreet={el.address.street}
                addressCity={el.address.city}
                addressZipCode={el.address.zipCode}
                addressCountry={el.address.country}
                />
            );
            
      
    }      
        
    
}*/
    
  /* var ClientsList = React.createClass({
        getInitialState: function(){
            return{
                displayedContacts: ClientsData
            };
        },
        instantSearch: function(event){
            var searchQuery = event.target.value.toLowerCase();
            var displayedContacts = ClientsData.filter(function(el) {
                var searchValue = el.name.toLowerCase;
                return searchValue.indexOf(searchQuery) !== -1;
            });
            console.log(displayedContacts)
        },
        render: function(){
            return(
                    <div className='contacts'>
                        <input type='text' className='search-field' onChange={this.instantSearch}/> 
                        <ul className='contacts_list'>
                            {
                                ClientsData.map (function(el) {
                                        return (<Contact 
                                                        name={el.general.firstName +' ' + el.general.lastName} 
                                                         avatar={el.general.avatar} 
                                                         jobTitle={el.job.title}
                                                />);
                                })
                            }    
                        </ul>
                    </div>
            );        
        }
        });
*/


/*class ClientsList extends Component {
       constructor(){
           super();
           this.state={
               search: ''
           };
       }
       instantSearch(event){
           this.setState({
               search: event.target.value.substr(0,20)
           });
       }
        render() {
            let filteredContacts = this.props.ClientsData.filter(
                (Contact) => {
                   return Contact.firstName.indexOf(
                   this.state.search) !== -1;
                }                              
            );
            return(
                    <div className='contacts'>
                        <input type='text' className='search-field' value={this.state.search} onChange={this.instantSearch.bind(this)}/> 
                        <ul className='contacts_list'>
                            {
                                filteredContacts.map (function(el) {
                                  
                                        return (<Contact 
                                                        name={el.general.firstName +' ' + el.general.lastName} 
                                                         avatar={el.general.avatar} 
                                                         jobTitle={el.job.title}
                                                />);
                                   
                                    
                                })
                            }
                                    
                        </ul>
                    </div>
            );        
        }
    };*/
            
            ReactDOM.render(
                    <ClientsList />,
            document.getElementById("clients_list")
            );
    ReactDOM.render(
                    <ContactFullInfo />,
            document.getElementById("clients_info")
            );
export default Contact;

    