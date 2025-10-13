import { useState } from 'react';
import { Container, Row, Col, Button, Card, Alert, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { 
  incrementQuantity, 
  decrementQuantity, 
  removeFromCart, 
  clearCart,
  applyDiscount
} from '../../store/slices/cartSlice';
import { Header } from '../layout';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setShowClearModal(false);
  };

  const handleApplyDiscount = () => {
    const discountCodes = {
      'FIRST10': 10,
      'SAVE20': 20,
      'WELCOME15': 15,
      'AQUA25': 25
    };

    const discountPercent = discountCodes[discountCode.toUpperCase()];
    if (discountPercent) {
      const discountAmount = (cart.totalAmount * discountPercent) / 100;
      dispatch(applyDiscount(discountAmount));
      setDiscountApplied(true);
    } else {
      alert('Invalid discount code. Try: FIRST10, SAVE20, WELCOME15, or AQUA25');
    }
  };

  const handleCheckout = () => {
    setShowBillModal(true);
  };

  const BillModal = () => (
    <Modal show={showBillModal} onHide={() => setShowBillModal(false)} size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-receipt me-2"></i>
          Order Bill / Invoice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <div className="bill-container">
          {/* Company Header */}
          <div className="bill-header text-center mb-4">
            <h4 className="text-primary">Ramesh Aqua Solutions</h4>
            <p className="mb-1">Premium Aquaculture Products</p>
            <p className="mb-1">📧 info@rameshaqua.com | 📞 +91 9876543210</p>
            <p>🌐 www.rameshaqua.com</p>
            <hr className="text-white" />
          </div>

          {/* Bill Details */}
          <Row className="mb-3">
            <Col md={6}>
              <strong>Bill No:</strong> #RA{Date.now().toString().slice(-6)}
            </Col>
            <Col md={6} className="text-end">
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </Col>
          </Row>

          {/* Items Table */}
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="bill-item-image me-2"
                          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }}
                        />
                        <div>
                          <div className="fw-bold">{item.name}</div>
                          <small className="text-muted">{item.category}</small>
                        </div>
                      </div>
                    </td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bill Summary */}
          <div className="bill-summary">
            <hr />
            <Row>
              <Col md={8}></Col>
              <Col md={4}>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{cart.totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (18% GST):</span>
                  <span>₹{cart.tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>
                    {cart.deliveryFee === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `₹${cart.deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="summary-row text-success">
                    <span>Discount:</span>
                    <span>-₹{cart.discount.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="summary-row total-row">
                  <strong>Total Amount:</strong>
                  <strong>₹{cart.finalAmount.toFixed(2)}</strong>
                </div>
              </Col>
            </Row>
          </div>

          {/* Footer */}
          <div className="bill-footer mt-4 text-center">
            <p className="mb-1">Thank you for your business!</p>
            <p className="text-muted">For support, contact us at support@rameshaqua.com</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="outline-primary" onClick={() => setShowBillModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          <i className="fas fa-print me-2"></i>
          Print Bill
        </Button>
      </Modal.Footer>
    </Modal>
  );

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <Container className="py-5">
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="empty-cart">
                <i className="fas fa-shopping-cart empty-cart-icon"></i>
                <h2>Your Cart is Empty</h2>
                <p>Add some amazing aquaculture products to get started!</p>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/categories')}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Continue Shopping
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      
      <Container fluid className="cart-container">
        {/* Back Navigation */}
        <Row className="mb-3">
          <Col>
            <Button 
              variant="outline-light" 
              onClick={() => navigate(-1)}
              className="d-flex align-items-center gap-2 back-btn"
            >
              <i className="fas fa-arrow-left"></i>
              Continue Shopping
            </Button>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* Cart Header */}
            <div className="cart-header">
              <h2 className="cart-title">
                <i className="fas fa-shopping-cart me-2"></i>
                Your Cart ({cart.totalItems} items)
              </h2>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => setShowClearModal(true)}
              >
                <i className="fas fa-trash me-2"></i>
                Clear Cart
              </Button>
            </div>

            {/* Cart Items */}
            <div className="cart-items">
              {cart.items.map(item => (
                <Card key={item.id} className="cart-item-card mb-3 p-0">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </Col>
                      <Col md={4}>
                        <h5 className="item-name">{item.name}</h5>
                        <p className="item-category">{item.category}</p>
                        <p className="item-description">{item.description}</p>
                      </Col>
                      <Col md={2}>
                        <div className="price-section">
                          <span className="current-price">₹{item.price}</span>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="quantity-controls">
                          <Button 
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDecrement(item.id)}>
                            <FaMinus/>
                          </Button>
                          <span className="quantity-display">{item.quantity}</span>
                          <Button 
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleIncrement(item.id)}
                          >
                            <FaPlus/>
                          </Button>
                        </div>
                      </Col>
                      <Col md={1}>
                        <div className="item-total">
                          ₹{item.totalPrice.toFixed(2)}
                        </div>
                      </Col>
                      <Col md={1}>
                        <Button 
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                          title="Remove Item"
                        >
                          <MdDeleteOutline />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>

          {/* Cart Summary */}
          <Col lg={4}>
            <Card className="cart-summary-card sticky-top">
              <Card.Header>
                <h4>Order Summary</h4>
              </Card.Header>
              <Card.Body>
                <div className="summary-row">
                  <span>Subtotal ({cart.totalItems} items):</span>
                  <span>₹{cart.totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (18% GST):</span>
                  <span>₹{cart.tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>
                    {cart.deliveryFee === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `₹${cart.deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="summary-row text-success">
                    <span>Discount:</span>
                    <span>-₹{cart.discount.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="summary-row total-row">
                  <strong>Total:</strong>
                  <strong>₹{cart.finalAmount.toFixed(2)}</strong>
                </div>

                {/* Discount Code */}
                {!discountApplied && (
                  <div className="discount-section mt-3">
                    <div className="input-group">
                      <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <Button 
                        variant="outline-primary"
                        onClick={handleApplyDiscount}
                      >
                        Apply
                      </Button>
                    </div>
                    <small className="text-muted">
                      Try: FIRST10, SAVE20, WELCOME15, AQUA25
                    </small>
                  </div>
                )}

                {cart.totalAmount < 500 && (
                  <Alert variant="info" className="mt-3">
                    <i className="fas fa-info-circle me-2"></i>
                    Add ₹{(500 - cart.totalAmount).toFixed(2)} more for FREE delivery!
                  </Alert>
                )}

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100 mt-3 checkout-btn"
                  onClick={handleCheckout}
                >
                  <i className="fas fa-credit-card me-2"></i>
                  Proceed to Checkout
                </Button>

                <Button 
                  variant="outline-primary" 
                  className="w-100 mt-2"
                  onClick={() => navigate('/categories')}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Clear Cart Modal */}
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Clear Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          Are you sure you want to remove all items from your cart?
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="outline-secondary" onClick={() => setShowClearModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </Modal.Footer>
      </Modal>

      <BillModal />
    </div>
  );
};

export default CartPage;