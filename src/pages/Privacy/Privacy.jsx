import { Grid, Text } from "components"

const Privacy = () => {
	return (
		<Grid
			itemsX="center"
			padding="2rem"
			gap="1rem"
			margin="1rem"
			style={{ backgroundColor: "var(--bg-color--white)", borderRadius: "16px" }}>
			<Text bold>Aviso de Privacidad</Text>
			<Text>MediTerms valora y respeta tu privacidad.</Text>
			<Text>
				A continuación, te proporcionamos información detallada sobre cómo recopilamos, utilizamos y protegemos
				tus datos personales. Te recomendamos leer este aviso de privacidad cuidadosamente antes de utilizar
				MediTerms.
			</Text>
			<Grid gap="0.5rem">
				<Text>1. Información recopilada</Text>
				<Text>
					Cuando utilizas MediTerms, podemos recopilar cierta información personal para mejorar tu experiencia
					de aprendizaje y proporcionarte servicios personalizados. La información que podemos recopilar
					incluye, pero no se limita a:
				</Text>
				<Text>
					- Información de perfil: Al crear una cuenta en MediTerms, puedes proporcionar información personal
					como tu nombre, dirección de correo electrónico, edad, ubicación y preferencias de idioma.
				</Text>
				<Text>
					- Información de uso: Recopilamos información sobre cómo utilizas MediTerms, como el tiempo que
					pasas en ella, las actividades y lecciones que completas, tus interacciones con el contenido y
					cualquier otra información relevante para mejorar tu experiencia.
				</Text>
				<Text>
					- Información de dispositivo: Podemos recopilar información técnica sobre el dispositivo que
					utilizas para acceder a MediTerms, como tu dirección IP, tipo de dispositivo, sistema operativo,
					proveedor de servicios de Internet y otros datos similares. ty
				</Text>
			</Grid>
			<Grid gap="0.5rem">
				<Text>2. Uso de la información</Text>
				<Text>Utilizamos la información recopilada para los siguientes propósitos:</Text>
				<Text>
					- Personalización: Utilizamos la información para adaptar el contenido y las lecciones de MediTerms
					a tus necesidades y preferencias individuales, brindándote una experiencia de aprendizaje
					personalizada.
				</Text>
				<Text>
					- Mejora de MediTerms: Analizamos los datos recopilados para mejorar continuamente MediTerms, su
					contenido y características, y optimizar el rendimiento de acuerdo con las necesidades de nuestros
					usuarios.
				</Text>
				<Text>
					- Comunicación: Podemos utilizar tu dirección de correo electrónico para enviarte actualizaciones
					sobre MediTerms, información relevante sobre el aprendizaje de idiomas, notificaciones de cambios en
					nuestros términos y condiciones, y otros mensajes importantes relacionados con tu cuenta.
				</Text>
			</Grid>
			<Grid gap="0.5rem">
				<Text>3. Compartir información</Text>
				<Text>
					No compartimos tu información personal con terceros sin tu consentimiento, a menos que sea necesario
					para cumplir con las leyes aplicables, proteger nuestros derechos legales o responder a solicitudes
					legales válidas.
				</Text>
				<Text>
					En algunos casos, podemos utilizar servicios de terceros para mejorar nuestros servicios. Estos
					proveedores de servicios están sujetos a acuerdos de confidencialidad y solo pueden utilizar tus
					datos personales en la medida necesaria para prestar los servicios solicitados por nuestra parte.
				</Text>
			</Grid>
			<Grid gap="0.5rem">
				<Text>4. Seguridad de los datos</Text>
				<Text>
					Tomamos medidas de seguridad razonables para proteger tu información personal contra el acceso no
					autorizado, la divulgación o la alteración. Sin embargo, debes ser consciente de que ninguna
					transmisión de datos a través de Internet o sistema de almacenamiento electrónico es completamente
					segura.
				</Text>
			</Grid>
			<Grid gap="0.5rem">
				<Text>5. Tus derechos</Text>
				<Text>
					Tienes ciertos derechos relacionados con tus datos personales, incluyendo el derecho a acceder,
					corregir, actualizar o eliminar tu información. Si deseas ejercer alguno de estos derechos o tienes
					preguntas adicionales sobre nuestra politica de privacidad, puedes contactarnos a través de los
					medios proporcionados al final de este aviso.
				</Text>
			</Grid>
			<Grid gap="0.5rem">
				<Text>6. Cambios en el aviso de privacidad</Text>
				<Text>
					Podemos actualizar periódicamente este aviso de privacidad para reflejar cambios en nuestras
					prácticas de recopilación y uso de datos. Te recomendamos revisar esta pagina con regularidad para
					estar al tanto de cualquier cambio importante.
				</Text>
			</Grid>
			<Grid gap="0.5rem">
				<Text>7. Consentimiento</Text>
				<Text>
					Al utilizar MediTerms, aceptas los términos establecidos en este aviso de privacidad y das tu
					consentimiento para el procesamiento de tus datos personales de acuerdo con los fines y métodos
					descritos anteriormente.
				</Text>
				<Text>
					Si tienes alguna pregunta o inquietud sobre nuestro aviso de privacidad, por favor contactanos a
					través del siguiente correo electronico:
				</Text>
				<a href="mailto:privacidad@mediterms.app">
					<Text color="first">privacidad@mediterms.app</Text>
				</a>
				<Text>Fecha de entrada en vigencia: 1 Enero 2023</Text>
				<Text>Fecha de ultima actualizacion: 1 Julio 2023</Text>
			</Grid>
		</Grid>
	)
}

export default Privacy
