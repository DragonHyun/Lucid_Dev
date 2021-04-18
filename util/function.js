module.exports = {
    //정의된 propertie인지 확인하는 함수.
    isDefined: async (...properties) => {
        try {
            for (let i in properties) {
                if (properties[i] == 'undefined' || properties[i] == null || properties[i] == '')
                    return false;
            }

            return true;
        } catch (err) {
            next(err);
        }
    },

}