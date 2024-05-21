
import { db, http } from './app'

if (process.env.NODE_ENV !== 'TEST') {
    db.then(() => {
        http.listen(5050, () => console.log('Server is listening on port 5050'))
    })
}
