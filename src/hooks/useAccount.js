import { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import { AuthContext } from '../contexts/AuthContext';

const useAccount = () => {
  const { user } = useContext(AuthContext)
  const { account, setAccountID } = useContext(AccountContext)
  const [accountID, setAcc] = useState(undefined)

  useEffect(() => {
    if (account) {
      setAcc(account)
    } else if (user && user.accounts.length > 0) {
      setAcc(user.accounts[0].clientID)
    }
  }, [user, account])

  const changeAccount = (id) => {
    setAccountID(id)
    setAcc(id)
  }

  return { account: accountID, changeAccount }
}

export default useAccount