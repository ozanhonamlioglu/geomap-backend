const Tasks = require('./tasks');

const make_hash = () => {
    let text = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 21; i++)
        text += chars.charAt(Math.floor(Math.random() * chars.length));

    return text;
};


module.exports.makeMarker = async (address) => {
    const task = new Tasks(address);

    try {
        let instance = await task.Info()
        instance = instance[0]
        
        // decode wanted fields
        let name    = instance.city
        let code    = instance.countryCode
        let lat     = instance.latitude
        let lng     = instance.longitude
    
        let newMarker = {
            id: make_hash(),
            name,
            lat,
            lng
        }
    
        if(code === 'DE') {
            return { error: false, inGermany: true, data: newMarker }
        } else {
            return { error: false, inGermany: false }
        }
    } catch (error) {
        return {error: true}
    }

}

module.exports.update = async (id, address, database) => {
    let out = await this.makeMarker(address);
    if(!out.error && out.inGermany) {
        let newData = { id };
        database.filter(obj => {
            if(obj.id === id) {
                // update internal
                obj.name = out.data.name
                obj.lat = out.data.lat
                obj.lng = out.data.lng
                // set new values
                newData.name = out.data.name
                newData.lat = out.data.lat
                newData.lng = out.data.lng
            }
        })
        out.data = newData
        return { newMarker: out }
    }
    return { newMarker: out }
}