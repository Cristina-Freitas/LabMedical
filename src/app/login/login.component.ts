import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, 
            CommonModule,
            ButtonModule,
            DialogModule,
            DividerModule,
            ReactiveFormsModule,
            RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  cadastro = new FormGroup({
    nomeUsuario: new FormControl('', Validators.required),
    emailUsuario: new FormControl('', Validators.required),
    senhaUsuario: new FormControl('', [Validators.minLength(9), Validators.required]),
    confirmarSenhaUsuario: new FormControl('', [Validators.minLength(9), Validators.required])
  });

login = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});

novoUsuario: any = {
  nomeUsuario: 'Cristina Freitas',
  emailUsuario: 'crisjf.tina@gmail.com',
  auth: false
};

cadastrarUsuario: any;
usuarios: any[] = [];
visible: boolean = false;
  emailUsuario: any = '';
  senhaUsuario: any = '';
  localStorage: any;
  email: any = '';
  password: any = '';


  constructor(private router: Router, @Inject(DOCUMENT) private document: Document ){
    this.localStorage = document.defaultView?.localStorage;
  };

ngOnInit(): void {
  // Inicializa os campos de email e senha com valores vazios
  this.emailUsuario = '';
  this.senhaUsuario = '';
  this.email = '';
  this.password = '';
  this.usuarios = this.getStorage();
  this.criarUsuario();
}
  criarUsuario() {
    let usuarios = this.getStorage();
    if(usuarios.find((usuario:{email: string}) => 
                      usuario.email == this.novoUsuario.email)){
      //  window.alert('Email ja existe!');
    }else{
      usuarios.push(this.novoUsuario);
      this.localStorage?.setItem('newUsers', JSON.stringify(usuarios));
      window.alert('Usuário criado com sucesso!');
  
    };
  }

showDialog() {
this.visible = true;
}

camposValidos(): boolean {
  return !!(
         this.cadastro.value.nomeUsuario && 
         this.cadastro.value.senhaUsuario &&
         this.cadastro.value.confirmarSenhaUsuario
  );
};

senhasIguais(): boolean {
  return this.cadastro.value.senhaUsuario === 
         this.cadastro.value.confirmarSenhaUsuario    
}
cadastrar(){
  if(this.camposValidos() && this.senhasIguais()){
     
     let usuarios = JSON.parse(localStorage.getItem('newUsers') || '[]');
      usuarios.push(this.cadastro.value);
      localStorage.setItem('newUsers', JSON.stringify(usuarios)); 
      this.router.navigate(['']);
      this.cadastro.reset();
  }else{
    window.alert('Preencha todos os campos corretamente e verifique se as senhas conferem para prosseguir!')
  }
}

getStorage(){
  const dadosUsuario: string[] = [];
  const usuarios = this.localStorage?.getItem('newUsers');
  if(!!usuarios){
    return JSON.parse(usuarios);
  }else{
    this.localStorage?.setItem('newUsers', JSON.stringify(dadosUsuario));
    return [];
  }
}

verificaEmail(){
  let usuarios = this.getStorage();
  return usuarios.find((usuario: {emailUsuario: string | null | undefined;})=> 
                        usuario.emailUsuario === this.login.value.email);
};
entrar() {
    if(this.login.value.email &&
      this.login.value.password
   ){
   let usuarioEncontrado = this.verificaEmail()
   if(usuarioEncontrado){
     if(usuarioEncontrado.senhaUsuario === this.login.value.password){
       this.usuarios = this.getStorage();

       const usuarioLogado = this.usuarios.map((usuario)=>{
         if(usuario.email === usuarioEncontrado.emailUsuario){
             return {...usuario, auth: true};
         }
         return usuario;
       });
       this.usuarios = usuarioLogado;
       this.localStorage?.setItem("newUsers", JSON.stringify(this.usuarios))
       this.router.navigate(['/inicio']);
       this.login.reset();
     }else{
       window.alert('Usuário ou senha inválidos!')
     }
   }
 }
}

voltar() {
  this.visible = false;
  this.router.navigate(['/login']);
}

resetSenha() {
  window.alert('Funcionalidade em construção!');
}

}
