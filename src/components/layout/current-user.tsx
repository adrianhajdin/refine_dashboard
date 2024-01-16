import { Popover, Button } from 'antd'
import CustomAvatar from '../custom-avatar'
import { useGetIdentity } from '@refinedev/core'

import type { User } from '@/graphql/schema.types'
import { Text } from '../text'
import { SettingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { AccountSettings } from './account-settings'

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: user } = useGetIdentity<User>()

  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Text
        strong
        style={{ padding: '12px 20px' }}
      >
        {user?.name}
      </Text>
      <div
        style={{
          borderTop: '1px solid #d9d9d9',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        <Button
          style={{ textAlign: 'left' }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)}
        >
          Account Settings
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Popover
        placement='bottomRight'
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={content}
      >
          <CustomAvatar 
            name={user?.name}
            src={user?.avatarUrl}
            size="default"
            style={{ cursor: 'pointer' }}
        />
      </Popover>
      {user && (
        <AccountSettings 
          opened={isOpen}
          setOpened={setIsOpen}
          userId={user.id}
        />
      )}
    </>
  )
}

export default CurrentUser