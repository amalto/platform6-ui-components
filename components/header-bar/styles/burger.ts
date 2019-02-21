import Radium from 'radium'

const hoverAnimation = Radium.keyframes( {
    '0%': { backgroundColor: '#fff' },
    '100%': { backgroundColor: '#f6f8f8' }
} )

export const styles = {
    hover: {
        ':hover': {
            // Use a placeholder animation name in `animation`
            animation: '.5s linear',
            // Assign the result of `keyframes` to `animationName`
            animationName: hoverAnimation,

            backgroundColor: '#f6f8f8'
        }
    }
}