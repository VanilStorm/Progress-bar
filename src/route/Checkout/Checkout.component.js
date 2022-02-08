import {Checkout as SourceCheckout} from "SourceRoute/Checkout/Checkout.component";
import ContentWrapper from "../../../../scandipwa/src/component/ContentWrapper";


class Checkout extends SourceCheckout {
    componentDidMount() {
        this.setState({activeSteps: [this.props.checkoutStep]})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.checkoutStep !== this.props.checkoutStep) {
            this.setState({activeSteps: [this.props.checkoutStep]})
            this.setState({competedSteps: [...this.state.competedSteps, prevProps.checkoutStep]})
        }
    }

    state = {
        activeSteps: [],
        competedSteps: []
    }

    progressBar() {
        const {activeSteps, competedSteps} = this.state
        const progressKeys = Object.keys(this.stepMap);
        const progressItems = progressKeys.filter((_item, index) => progressKeys.length - 1 !== index)
        return (
            <div className='progressWrap'>
                {progressItems.map((item, index) => {
                    return (
                        <div className={`stepper-item ${activeSteps.includes(item) ? 'active' :
                            competedSteps.includes(item) ? 'completed' : ''}`}>
                            <div className='step-counter'>{competedSteps.includes(item) ? '✓' : index + 1}</div>
                            <div className="step-name">{item}</div>
                        </div>
                    )
                })}
            </div>
        )

    }

    render() {
        return (
            <main block="Checkout">
                {this.progressBar()}
                <ContentWrapper
                    wrapperMix={{block: 'Checkout', elem: 'Wrapper'}}
                    label={__('Checkout page')}
                >
                    {this.renderSummary(true)}
                    <div block="Checkout" elem="Step">
                        {this.renderTitle()}
                        {this.renderGuestForm()}
                        {this.renderStep()}
                        {this.renderLoader()}
                    </div>
                    <div>
                        {this.renderSummary()}
                        {this.renderPromo()}
                        {this.renderCoupon()}
                    </div>
                </ContentWrapper>
            </main>
        );
    }

}

export default Checkout
