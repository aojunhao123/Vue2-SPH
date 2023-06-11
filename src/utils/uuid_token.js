// 该模块用于生成游客状态下的唯一标识
import { v4 as uuidv4 } from 'uuid';

// 该id只生成一次，之后不发生改变
export const getUUID = () => {
    // 先从localStorage中获取
    let uuid_token = localStorage.getItem('uuid_token')
    // 若没有则生成一个并存入localStorage
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('uuid_token', uuid_token)
    }
    // 返回uuid
    return uuid_token
}