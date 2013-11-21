THREE.ScrewedGeometry = function(steps, outline, axis, skew){
    THREE.Geometry.call(this);
    var scope = this;
    var skewVector = new THREE.Vector3().copy(axis).multiplyScalar(skew)
    for (var i = 0; i <= steps; i++){
        console.log("Segment " + i)
        for (var vec = 0; vec < outline.length; vec++){
            console.log("Push " + (i*outline.length+vec) + ": " + outline[vec].x + ", " + outline[vec].y + ", " + outline[vec].z);            
            this.vertices.push( new THREE.Vector3().copy(outline[vec]))
            outline[vec].applyAxisAngle(axis, 2*Math.PI/steps)
            outline[vec].add(skewVector)
        }
    }
    console.log(this.vertices[0].toString());
    console.log(this.vertices[1].toString())
    totLen = outline.length*(steps+1)
    for (var i = outline.length; i < totLen; i+= outline.length){
        for (var j = 1; j < outline.length; j++){
            this.faces.push(new THREE.Face3((i+j-1)%totLen, (i-outline.length+j)%totLen,(i-outline.length+j-1)%totLen ));
            this.faces.push(new THREE.Face3((i+j-1)%totLen, (i+j)%totLen, (i-outline.length+j)%totLen ));
        }
    }

    this.computeCentroids();
    this.mergeVertices();
    this.computeFaceNormals();
    this.computeVertexNormals();
}

THREE.ScrewedGeometry.prototype = Object.create( THREE.Geometry.prototype );
