import React from "react";

export default class SafeComponent extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false, error: '' }
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true }
    }

    componentDidCatch() { }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: 'center' }}><b>Something went wrong.</b></div>
            )
        }
        return this.props.children

    }
}