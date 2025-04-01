import React from 'react'
import PageWrapper from '../../components/shared/common/layouts/PageWrapper'
import PageContent from '../../components/shared/common/layouts/PageContent'

const InDevelopment = () => {
  return (
    <PageWrapper>
        <PageContent title="Coming Soon...">
            <div className='flex flex-col items-center'>
                <p>This page is under development.</p>
            </div>
        </PageContent>
    </PageWrapper>
  )
}

export default InDevelopment