import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import ActionButton from '../typescript/index'

storiesOf('ActionButton', module)
    .add('Type', () => {
        return (
            <div>
                <div className='form-group'>
                    <h4 className='mgt-10'>Transparent background</h4>
                    <ActionButton btnClass='btn btn-trans btn-info mgt-10 mgr-5'
                        iconClass='fa fa-info'
                        tooltipText='Info button'
                        clickAction={action('transparent info button')}
                    />
                    <ActionButton btnClass='btn btn-trans btn-danger mgt-10 mgr-5'
                        iconClass='fa fa-trash'
                        clickAction={action('transparent danger button')}
                        tooltipText='Danger button'
                    />
                    <ActionButton btnClass='btn btn-trans btn-warning mgt-10 mgr-5'
                        iconClass='fa fa-exclamation'
                        clickAction={action('transparent warning button')}
                        tooltipText='Warning button'
                    />
                    <ActionButton btnClass='btn btn-trans btn-primary mgt-10 mgr-5'
                        iconClass='fa fa-check'
                        clickAction={action('transparent primary button')}
                        tooltipText='Primary button'
                    />
                    <ActionButton btnClass='btn btn-trans btn-font mgt-10 mgr-5'
                        iconClass='fa fa-shield'
                        clickAction={action('transparent font button')}
                        tooltipText='Default button'
                    />
                </div>

                <div className='form-group'>
                    <h4 className='mgt-10'>Colored background</h4>
                    <ActionButton btnClass='btn btn-info mgt-10 mgr-5'
                        iconClass='fa fa-info'
                        clickAction={action('colored info button')}
                        tooltipText='Info button'
                    />
                    <ActionButton btnClass='btn btn-danger mgt-10 mgr-5'
                        iconClass='fa fa-trash'
                        clickAction={action('colored danger button')}
                        tooltipText='Danger button'
                    />
                    <ActionButton btnClass='btn btn-warning mgt-10 mgr-5'
                        iconClass='fa fa-exclamation'
                        clickAction={action('colored warning button')}
                        tooltipText='Warning button'
                    />
                    <ActionButton btnClass='btn btn-primary mgt-10 mgr-5'
                        iconClass='fa fa-check'
                        clickAction={action('colored primary button')}
                        tooltipText='Primary button'
                    />
                    <ActionButton btnClass='btn btn-font mgt-10 mgr-5'
                        iconClass='fa fa-shield'
                        clickAction={action('colored font button')}
                        tooltipText='Default button'
                    />
                </div>
            </div>
        )
    })
