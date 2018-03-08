import React from 'react'


class Results extends React.Component {


    render () {
        if(this.props.usuario1 && this.props.usuario2){
            return(

                <div>
                    <div className="container text-center">
                        <div className="row text-center">
                            <div className="col-md-6">
                                <h1></h1>
                            </div>
                            <div className="col-md-6">

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

export default Results;