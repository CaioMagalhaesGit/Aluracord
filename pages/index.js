// shift alt f (identar)
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
             ${Tag}{
                color: ${appConfig.theme.colors.neutrals['000']};              
                font-size: 24px;
                font-weight: 600;
             }
         `}</style>
        </>
    )
}




// function onChange(ev){
//     const {username} = ev.target;   
// }



export default function PaginaInicial() {
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    return (

        <>

            <Box

                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[100],
                    backgroundImage: 'url(https://p4.wallpaperbetter.com/wallpaper/380/523/681/design-neon-abstract-light-design-hd-wallpaper-preview.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        opacity: 0.95,
                    }}

                >

                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {                            
                            event.preventDefault();
                            roteamento.push(`/chat?username=${username}`);

                            //window.location.href='/chat';
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}

                    >

                        <Titulo tag="h2">Bem Vindo!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            <>Entre com sua conta do GitHub</>
                        </Text>
                        <TextField
                            value={username}
                            onChange={function (event) {
                                //console.log('usuario digitou', event.target.value);
                                const valor = event.target.value;
                                setUsername(valor);


                            }}
                            fullWidth
                            placeholder='Digite seu nome de usuário'
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            disabled={!username || username.length <= 2}
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}

                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box

                        styleSheet={{

                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        
                        <Image //onChange={onChange}
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '10px',
                            }}

                            src={
                                username.length > 1
                                ?`https://github.com/${username}.png`
                                :`https://rockcontent.com/br/wp-content/uploads/sites/2/2020/03/github.jpg`
                            }

                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}