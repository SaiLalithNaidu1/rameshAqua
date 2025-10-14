import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import Header from '../layout/Header';
import { MobileHeader } from '../mobile';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMobile } = useDeviceDetect();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      {!isMobile && <Header />}
      {isMobile && <MobileHeader title="Profile" />}
      
      <Container className={`${isMobile ? 'py-3' : 'py-5'}`}>
        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="shadow-sm">
              <Card.Body className="text-center py-5">
                <div className="mb-4">
                  <div className="avatar-circle mb-3" style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: '#1976d2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    margin: '0 auto'
                  }}>
                    <i className="fas fa-user"></i>
                  </div>
                  <h3 className="mb-2">{user?.displayName || user?.email || 'User'}</h3>
                  <p className="text-muted">{user?.email}</p>
                </div>
                
                <div className="d-grid gap-2 mt-4">
                  <Button variant="outline-primary" size="lg">
                    <i className="fas fa-edit me-2"></i>
                    Edit Profile
                  </Button>
                  <Button variant="outline-secondary" size="lg">
                    <i className="fas fa-cog me-2"></i>
                    Settings
                  </Button>
                  <Button variant="outline-danger" size="lg" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
