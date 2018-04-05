import * as React from 'react'
import Pathline from 'react-styleguidist/lib/rsg-components/Pathline/PathLineRenderer'

import * as changeCase from 'change-case'

module CustomPathline {
    export interface Props extends React.ClassAttributes<CustomPathline> {
        children: string;
    }

    export interface State {

    }
}

class CustomPathline extends React.Component<CustomPathline.Props, CustomPathline.State> {
    constructor( props: CustomPathline.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { children } = this.props
        const pascalCaseName = changeCase.pascalCase(children)

        return <div>
            <Pathline classes={{}} children={`npm install --save ${children}`} />
            <Pathline classes={{}} children={`import * as ${pascalCaseName} from ${children}`} />
        </div>
    }
 }

export default CustomPathline