import { connect, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { doCloseBoxLogin, doOpenBoxLogin, userLogout } from '../../../Redux/authSlice'
import './module_hover.css'
import { store } from '../../../store'
import { clearCart } from '../../../Redux/reducer'

function ModuleHover(props) {
  const { user, doCloseBoxLogin, doOpenBoxLogin, isOpenBoxLogin, userLogout, clearCart } = props
  const navigate = useNavigate()
  console.log('om', user)
  const handleGoToInfo = () => {
    console.log(isOpenBoxLogin, user)
    if (!user) {
      doOpenBoxLogin()
    }
  }

  const handleLogOut = () => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
      // elThongBao.textContent = 'Đăng xuất thành công'
      // setTimeout(() => {
      //     elThongBao.textContent = ''
      // },500)
      alert('Đăng xuất thành công')
      userLogout()
      doCloseBoxLogin()
      clearCart()
    }
  }

  return (
    <ul id='module_hover' className='1'>
      <li className='module_hover_item' onClick={handleGoToInfo}>
        {user ? `Account: ${user}` : 'Thông tin tài khoản'}
      </li>
      <li className='module_hover_item' onClick={handleGoToInfo}>Đơn hàng của tôi</li>
      {user && (
        <li className='module_hover_item' onClick={handleLogOut}>
          Đăng xuất
        </li>
      )}
      <p className='thongBao'></p>
    </ul>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.userCurrent,
  isOpenBoxLogin: state.auth.isOpenBoxLogin,
})

const mapDispatchToProp = (dispatch) => ({
  doCloseBoxLogin: () => store.dispatch(doCloseBoxLogin()),
  doOpenBoxLogin: () => store.dispatch(doOpenBoxLogin()),
  userLogout: () => store.dispatch(userLogout()),
  clearCart: ()=> store.dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProp)(ModuleHover)
