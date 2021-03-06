import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ5OTIzMiwiZXhwIjoxOTU5MDc1MjMyfQ.qu7POKhBnWuW5s0kfwURf47AELp9vEcnlosZ8IAgB8c'
const SUPABASE_URL = 'https://povvjlcegolfgkwilrxz.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



function escutaMensagensemtemporeal(adicionamensagem) {
    return supabaseClient
        .from('mensagens(aluracord)')
        .on('INSERT', (respostalive) => {
            adicionamensagem(respostalive.new);
        })
        .subscribe();
}


export default function ChatPage() {

    const roteamento = useRouter();
    const usuariologado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [ListaDeMensagens, setListaDeMensagens] = React.useState([]);


    React.useEffect(() => {
        supabaseClient
            .from('mensagens(aluracord)')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });

        escutaMensagensemtemporeal((novaMensagem) => {
            //console.log('nova msg', novaMensagem);
            setListaDeMensagens((valoratuallista) => {
                return [
                    novaMensagem,
                    ...valoratuallista,
                ]
            });
        });

    }, []);

    
    function deletarmensagem() {
        setListaDeMensagens(ListaDeMensagens.filter(function (mensagem) {
            return !mensagem.delete
        }));
    }


    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: ListaDeMensagens.length + 1,
            de: usuariologado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens(aluracord)')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                //console.log('criando mensagem:', data);
            });

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                //backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://p4.wallpaperbetter.com/wallpaper/380/523/681/design-neon-abstract-light-design-hd-wallpaper-preview.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
                maxWidth: '100%',
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    opacity: 0.95,
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',

                    }}
                >
                    <MessageList mensagens={ListaDeMensagens} deletarmensagem={deletarmensagem}/>
                    {/* {ListaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    }
                    )} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {

                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }

                            }}
                            placeholder="Insira sua mensagem aqui..."

                            type="textarea"
                            styleSheet={{

                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],



                            }}


                        />

                        <ButtonSendSticker

                            onStickerClick={(sticker) => {
                                //console.log("salva esse sticker");
                                handleNovaMensagem(':sticker:' + sticker);
                            }}

                        />

                        <Button
                            onClick={(event) => {

                                handleNovaMensagem(mensagem);
                            }}
                            label='Enviar'
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}



function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {



    return (
        <Box

            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',

            }}

        >

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: "flex",
                                alignItems: "center"
                            }}

                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],

                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}

                            </Text>
                            <Icon
                                name={"FaTrash"}
                                styleSheet={{
                                    marginLeft: "auto",
                                    marginRight: ".7rem",
                                    transition: ".4s ease all",
                                    cursor: "pointer",
                                    hover: {
                                        color: appConfig.theme.colors.neutrals['000']
                                    }
                                }}
                                onClick={() => {
                                    mensagem.delete = true;
                                    props.deletarmensagem();
                                }}   
                                title = 'Deletar mensagem'                         
                               
                            />

                        </Box>
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:') ? (
                            <Image src={mensagem.texto.replace(':sticker:', '')} />
                        ) : (
                            mensagem.texto
                        )}
                        {/* {mensagem.texto} */}
                    </Text>
                );
            })}

        </Box>
    )
}