/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- SignUpScreen Component ---
interface SignUpScreenProps {
  onSignUp: (email: string, pass: string) => void;
  onShowLogin: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }
    
    // Simula a criação da conta
    setTimeout(() => {
      onSignUp(email, password);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-logo-container">
          <h1 className="auth-title">Criar Conta</h1>
        </div>

        <form onSubmit={handleSubmit} className="config-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="config-input" placeholder="seu@email.com" required disabled={isLoading} aria-invalid={!!error}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="config-input" placeholder="••••••••" required disabled={isLoading} aria-invalid={!!error}/>
          </div>
           <div className="form-group">
            <label htmlFor="confirm-password">Confirmar Senha</label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="config-input" placeholder="••••••••" required disabled={isLoading} aria-invalid={!!error}/>
          </div>

          {error && <p className="config-error-message" role="alert">{error}</p>}

          <button type="submit" className="config-submit-button" disabled={isLoading}>
            {isLoading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>

        <p className="auth-switch-text">
          Já tem uma conta?{' '}
          <button onClick={onShowLogin} className="auth-switch-link">
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
};


// --- LoginScreen Component ---
interface LoginScreenProps {
  onLogin: (email: string, pass: string) => boolean;
  onShowSignUp: () => void;
  signupSuccessMessage?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onShowSignUp, signupSuccessMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        setIsLoading(false);
        return;
    }
    
    // Simula uma chamada de API
    setTimeout(() => {
      if (!onLogin(email, password)) {
        setError('E-mail ou senha inválidos.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-logo-container">
          <h1 className="auth-title">Acessar Painel</h1>
        </div>

        {signupSuccessMessage && <p className="config-success-message" role="status">{signupSuccessMessage}</p>}

        <form onSubmit={handleSubmit} className="config-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="config-input" placeholder="seu@email.com" required disabled={isLoading} aria-invalid={!!error} aria-describedby="error-message"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="config-input" placeholder="••••••••" required disabled={isLoading} aria-invalid={!!error} aria-describedby="error-message"/>
          </div>

          {error && <p id="error-message" className="config-error-message" role="alert">{error}</p>}

          <button type="submit" className="config-submit-button" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
         <p className="auth-switch-text">
          Não tem uma conta?{' '}
          <button onClick={onShowSignUp} className="auth-switch-link">
            Crie uma agora
          </button>
        </p>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="icon-button" onClick={onLogout} title="Sair">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      <main className="dashboard-main">
        <section className="balance-card">
          <span className="card-title">Saldo Atual</span>
          <p className="balance-amount">R$ 0,00</p>
        </section>

        <section className="summary-cards-grid">
          <div className="summary-card">
            <span className="card-title">Entradas (Mês)</span>
            <p className="summary-amount positive">R$ 0,00</p>
          </div>
          <div className="summary-card">
            <span className="card-title">Saídas (Mês)</span>
            <p className="summary-amount negative">R$ 0,00</p>
          </div>
          <div className="summary-card">
            <span className="card-title">Gastos Cartão (Mês)</span>
            <p className="summary-amount negative">R$ 0,00</p>
          </div>
        </section>

        <section className="transactions-section">
          <h2>Últimas Transações</h2>
          <div className="transactions-list">
            <p>Nenhuma transação registrada.</p>
          </div>
        </section>
      </main>

      <nav className="bottom-nav">
        <a href="#" className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Dashboard</span>
        </a>
        <a href="#" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Extrato</span>
        </a>
        <button className="fab">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <a href="#" className="nav-item">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>A Pagar</span>
        </a>
        <a href="#" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12C22 10.8954 21.1046 10 20 10H4C2.89543 10 2 10.8954 2 12V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 10V6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Carteira</span>
        </a>
      </nav>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [userCredentials, setUserCredentials] = useState<{email: string, pass: string} | null>(null);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('');

  const handleLogin = (email: string, pass: string): boolean => {
    if (userCredentials && userCredentials.email === email.toLowerCase() && userCredentials.pass === pass) {
      setIsLoggedIn(true);
      setSignupSuccessMessage('');
      return true;
    }
    return false;
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthView('login');
  };
  
  const handleSignUp = (email: string, pass: string) => {
    setUserCredentials({ email: email.toLowerCase(), pass });
    setSignupSuccessMessage('Conta criada com sucesso! Faça o login.');
    setAuthView('login');
  };
  
  const showSignUp = () => {
    setSignupSuccessMessage('');
    setAuthView('signup');
  };
  
  const showLogin = () => {
    setAuthView('login');
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  if (authView === 'signup') {
    return <SignUpScreen onSignUp={handleSignUp} onShowLogin={showLogin} />;
  }

  return (
    <LoginScreen 
      onLogin={handleLogin} 
      onShowSignUp={showSignUp} 
      signupSuccessMessage={signupSuccessMessage}
    />
  );
};

// Render the App to the DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
