import React from "react";
import "./App.css";

class App4 extends React.Component {
    state = {
    selectedOption: "Option1",
    textInput: "",
    };

    handleOptionChange = (event) => {
    this.setState({
        selectedOption: event.target.value,
        });
    };

    handleTextInput = (event) => {
    this.setState({
        textInput: event.target.value,
    });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(`Selected option: ${this.state.selectedOption}`);
        console.log(`Text input: ${this.state.textInput}`);
    };
    
    render() {
        return (
        <div className="App">
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
        <label>
        <input
        type="radio"
        value="Option1"
        checked={this.state.selectedOption === "Option1"}
        onChange={this.handleOptionChange}
        />
            Option 1
        </label>
        <br />
        <label>
        <input
        type="radio"
        value="Option2"
        checked={this.state.selectedOption === "Option2"}
        onChange={this.handleOptionChange}
        />
        Option 2
        </label>
        <br />
        <label>
        <input
        type="radio"
        value="Option3"
        checked={this.state.selectedOption === "Option3"}
        onChange={this.handleOptionChange}
        />
        Option 3
        </label>
        </div>
        <div className="form-group">
        <textarea
           value={this.state.textInput}
           onChange={this.handleTextInput}
         />
        </div>
        <button type="submit" onClick={this.handleFormSubmit}>Submit</button>
        </form>
        </div>
        );
    }
}

export default App4;