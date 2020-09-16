import React, { Component} from 'react';
import axios from "axios";

import PortfolioItem from './portfolio-item';


export default class PortfolioContainer extends Component {
    constructor() {
    super();
    
    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [ ]
      
    };


    this.getPortfolioItems = this.getPortfolioItems.bind(this);

    this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);  

    this.handleFilter = this.handleFilter.bind(this);
    }


    handleFilter(filter) {
        this.setState({
          data: this.state.data.filter(item => {
            return item.category === filter;
          })
        }); 
    }

    getPortfolioItems() { 
      const axios = require('axios'); 

      axios
        .get("https://hajasc.devcamp.space/portfolio/portfolio_items")
        .then(response => {
          // handle success
          console.log("response-data:", response);
          this.setState({
            data: response.data.portfolio_items
          })
        })
        .catch(error => {
          // handle error
          console.log(error);
        })

  }

    portfolioItems() {
       
        return this.state.data.map(item => {
        
            return <PortfolioItem 
            key = {item.id}
            item = {item}  />;

        });
    }

    handlePageTitleUpdate() {
      this.setState ({
        pageTitle: "Something Else"
      });
    }

    componentDidMount() {
        this.getPortfolioItems(); 
    }


    render() {
      if (this.state.isLoading) {
        return <div>Loading..</div>;
      }
     
        return (
            <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter("Business")}>
                  Business
                </button>
                <button className="btn" onClick={() => this.handleFilter("Productivity")}>
                  Productivity
                </button>
                <button className="btn" onClick={() => this.handleFilter("Entertainment")}>
                  Entertainment
                </button>

              {this.portfolioItems()}
           </div>
        );
      }
    }

