'use client'
import { getProfileService } from '@/services/client/client-service'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import PlansModal from './plans'

const ToShowPlanModal = () => {
    const session = useSession()
    const [openPlansModal, setOpenPlansModal] = React.useState(false)
    const modalRef = React.useRef(null)
    const userId = session?.data?.user?.id
    const { data: user, isLoading } = useSWR(session?.data?.user?.id ? `/client/${userId}` : null, getProfileService, { revalidateOnFocus: false })
    const userPlanOrSubscriptionId = user?.data?.data?.planOrSubscriptionId

    useEffect(() => {
        if (!isLoading && (userPlanOrSubscriptionId == null || userPlanOrSubscriptionId == '' || !userPlanOrSubscriptionId || userPlanOrSubscriptionId == 'undefined')) {
            setOpenPlansModal(true)
        }
    }, [userPlanOrSubscriptionId, isLoading])

    if (userPlanOrSubscriptionId != null) {
        return null
    }

    return (
        <div>
            {openPlansModal && (
                <PlansModal
                    modalRef={modalRef}
                    openPlansModal={openPlansModal}
                    setOpenPlansModal={setOpenPlansModal}
                    toHide={true}
                />
            )}
        </div>
    )
}

export default ToShowPlanModal